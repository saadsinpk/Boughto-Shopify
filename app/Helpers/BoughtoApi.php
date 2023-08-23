<?php

namespace App\Helpers;

use App\Client;
use Cache;
use Config;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class BoughtoApi
{
    public \Illuminate\Http\Client\PendingRequest $request;
    public string $app_url;

    public function __construct($api_key = null)
    {
        $this->request = Http::withToken($api_key)->withHeaders(['Accept' => 'application/json']);
        $this->app_url = env('API_URL', 'https://boughtofeed.co.uk/api');
    }

    public static function get($api_key)
    {
        return new BoughtoApi($api_key);
    }

    public function getStockPriceImports($page, $paginator_path)
    {
        $url     = $this->app_url . "/" . 'imports/manage';
        $request = $this->request->get($url,
            ['page' => $page, 'importer_type' => 'stock_price_imports', 'resultsPerPage' => '10']);

        if ($request->status() != 200) {
            return new LengthAwarePaginator([], 0, 1, 1);
        }
        $request = $request->json();

        return new LengthAwarePaginator($request['imports']['data'], $request['imports']['total'],
            $request['imports']['per_page'], $request['imports']['current_page'], ['path' => $paginator_path]);
    }

    public function countStockPriceImport()
    {
        $url     = $this->app_url . "/" . 'imports/manage/count-running';
        $request = $this->request->get($url, ['importer_type' => 'stock_price_imports']);

        if ($request->status() != 200) {
            return 0;
        }
        $request = $request->json();

        return $request['count'];
    }

    public function queueStockPriceImport($data)
    {
        $url = $this->app_url . "/" . 'imports/stock-price';

        $body = [
            'type'                => $data['type'],
            'update_feed_title'   => $data['title'],
            'update_feed_comment' => $data['description'],
            'product_code'        => $data['product_code'],
            'stock'               => $data['stock'],
            'local_stock'         => $data['local_stock'] ?? null,
            'price'               => $data['price'],
        ];

        if (isset($data['delimiter']) && !empty($data['delimiter'])) {
            $body['delimiter'] = $data['delimiter'];
        }

        if (isset($data['tyre_supplier']) && !empty($data['tyre_supplier'])) {
            $body['tyre_supplier'] = $data['tyre_supplier'];
        }

        if (isset($data['clients']) && !empty($data['clients'])) {
            $body['clients'] = $data['clients'];
        }

        if (isset($data['file'])) {
            $request = $this->request
                ->attach('file', $data['file'], 'file.csv')
                ->post($url, $body);
        } else {
            $body['url'] = $data['url'];
            $request     = $this->request
                ->post($url, $body);
        }


        if ($request->status() != 200) {
            \Sentry::captureMessage("Unexpected Status: " . json_encode($request->json()));

            return null;
        }
        $request = $request->json();

        return $request['import_id'];
    }

    public function queueTyreDataImport($data)
    {
        $url = $this->app_url . "/" . 'imports/tyre-data';

        $body = $data;
        unset($body['file']);

        $request = $this->request
            ->attach('file', $data['file'], 'file.csv')
            ->post($url, $body);

        if ($request->status() != 200) {
            \Sentry::captureMessage("Unexpected Status: " . json_encode($request->json()));

            return null;
        }
        $request = $request->json();

        return $request['import_id'];
    }

    public function queueWheelDataImport($data)
    {
        $url = $this->app_url . "/" . 'imports/wheel-data';

        $body = $data;
        unset($body['file']);

        $request = $this->request
            ->attach('file', $data['file'], 'file.csv')
            ->post($url, $body);

        if ($request->status() != 200) {
            \Sentry::captureMessage("Unexpected Status: " . json_encode($request->json()));

            return null;
        }
        $request = $request->json();

        return $request['import_id'];
    }

    public function queue4x4CustomDataImport($data)
    {
        $url = $this->app_url . "/" . 'imports/wheel-data/custom_data_4x4';

        $body = $data;
        unset($body['file']);

        $request = $this->request
            ->attach('file', $data['file'], 'file.csv')
            ->post($url, $body);

        if ($request->status() != 200) {
            \Sentry::captureMessage("Unexpected Status: " . json_encode($request->json()));

            return null;
        }
        $request = $request->json();

        return $request['import_id'];
    }

    public function getStockPriceImport($import_id)
    {
        $url     = $this->app_url . "/" . 'imports/manage/' . $import_id;
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getStockPriceImportErrors($import_id, $page, $paginator_path)
    {
        $url     = $this->app_url . "/" . 'imports/manage/' . $import_id . '/errors';
        $request = $this->request->get($url, ['paginated' => 1, 'resultsPerPage' => 10, 'page' => $page]);

        if ($request->status() != 200) {
            return $request->body();
        }
        $request = $request->json();

        return [
            'errors' => new LengthAwarePaginator($request['errors']['data'], $request['errors']['total'],
                $request['errors']['per_page'], $request['errors']['current_page'], ['path' => $paginator_path]),
            'import' => $request['import'],
        ];
    }

    public function cancelImport($import_id)
    {
        $url     = $this->app_url . "/" . 'imports/manage/' . $import_id;
        $request = $this->request->patch($url);

        return $request->json();
    }

    public function vrmStats()
    {
        $url     = $this->app_url . "/" . 'vrm';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function vrmSet($limit)
    {
        $url     = $this->app_url . "/" . 'vrm';
        $request = $this->request->post($url, ['max_monthly' => $limit]);

        return $request->json();
    }


    public function getManufacturer($manufacturer_id = null)
    {
        $url = $this->app_url . "/" . 'vehicles/manufacturers';
        if ($manufacturer_id != null) {
            $url .= "/" . $manufacturer_id;
        }
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getManufacturerModels($man_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers/' . $man_id . '/models';
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getManufacturerAllModels($man_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers/' . $man_id . '/all-models';
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getModel($model_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/models/' . $model_id;
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getModelGenerations($model_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/models/' . $model_id . '/generations';
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getAllModelGenerations($model_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/models/' . $model_id . '/all-generations';
        $request = $this->request->get($url);

        if ($request->status() != 200) {
            return [];
        }

        return $request->json();
    }

    public function getGeneration($generation_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/generations/' . $generation_id;
        $request = $this->request->get($url);

        return $request->json();
    }


    public function getGenerationChassis($generation_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/generations/' . $generation_id . '/chassis';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getAllGenerationChassis($generation_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/generations/' . $generation_id . '/all-chassis';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getChassis($chassis_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getChassisVrm($vrm)
    {
        $url     = $this->app_url . '/search/chassis/vrm';
        $request = $this->request->post($url, ['vrm' => $vrm]);

        if ($request->status() != 200) {
            return ['status' => 'failed'];
        }

        return $request->json();
    }

    public function getChassisEngines($chassis_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/engines';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getChassisEngine($chassis_id, $engine_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/engines/' . $engine_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function addChassisEngines($chassis_id, $name, $hp)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/engines';
        $request = $this->request->post($url, [
            'name'     => $name,
            'power_hp' => $hp,
        ]);

        return $request->json();
    }

    public function updateChassisEngines($chassis_id, $engine_id, $name, $hp)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/engines/' . $engine_id;
        $request = $this->request->post($url, [
            'name'     => $name,
            'power_hp' => $hp,
        ]);

        return $request->json();
    }

    public function deleteChassisEngines($chassis_id, $engine_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/engines/' . $engine_id;
        $request = $this->request->delete($url);

        return $request->json();
    }

    public function getChassisUpsteps($chassis_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getChassisTyres($chassis_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/tyre-sizes';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function updateChassis($chassis_id, $data)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id;
        $request = $this->request->post($url, $data);

        return $request->json();
    }

    public function toggleChassis($chassis_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/toggle';
        $request = $this->request->patch($url);

        return $request->json();
    }

    public function getChassisUpstep($chassis_id, $upstep_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps/' . $upstep_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function createChassisUpstep($chassis_id, $payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps';
        $request = $this->request->post($url, $payload);

        return $request->json();
    }

    public function createManufacturer($payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers';
        $request = $this->request->post($url, $payload);

        return $request->json();
    }

    public function createModel($payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/models';
        $request = $this->request->post($url, $payload);

        return $request->json();
    }

    public function createGeneration($payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/generations';
        $request = $this->request->post($url, $payload);

        return $request->json();
    }

    public function createChassis($payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis';
        $request = $this->request->post($url, $payload);

        return $request->json();
    }

    public function updateChassisUpstep($chassis_id, $upstep_id, $payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps/' . $upstep_id;
        $request = $this->request->post($url, $payload);

        return $request->json();
    }


    public function toggleChassisUpstep($chassis_id, $upstep_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps/' . $upstep_id . '/toggle';
        $request = $this->request->patch($url);

        return $request->json();
    }

    public function deleteChassisUpstep($chassis_id, $upstep_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps/' . $upstep_id;
        $request = $this->request->delete($url);

        return $request->json();
    }

    public function toggleChassisTyre($chassis_id, $tyre_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/tyre-sizes/' . $tyre_id . '/toggle';
        $request = $this->request->patch($url);

        return $request->json();
    }

    public function getChassisTyre($chassis_id, $tyre_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/tyre-sizes/' . $tyre_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function updateChassisTyre($chassis_id, $tyre_id, $payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/tyre-sizes/' . $tyre_id;
        $request = $this->request->post($url, $payload);

        return $request->json();
    }


    public function deleteChassisTyre($chassis_id, $tyre_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/tyre-sizes/' . $tyre_id;
        $request = $this->request->delete($url);

        return $request->json();
    }

    public function createChassisUpstepTyre($chassis_id, $upstep_id, $payload)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/tyre-sizes';
        $request = $this->request->post($url, array_merge($payload, ['upstep_id' => $upstep_id]));

        return $request->json();
    }

    public function createCustomChassis($formData)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis';
        $request = $this->request->asForm()->post($url, $formData);

        return $request->json();
    }

    public function createChassisEngine($chassis_id, $engine)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/engines';
        $request = $this->request->asForm()->post($url, ['name' => $engine]);

        return $request->json();
    }

    public function createUpstep($chassis_id, $formData)
    {
        $url     = $this->app_url . "/" . 'vehicles/chassis/' . $chassis_id . '/upsteps';
        $request = $this->request->asForm()->post($url, $formData);

        return $request->json();
    }

    public function getWheelCustomizePricing()
    {
        $url     = $this->app_url . "/" . 'brands/pricing/wheel';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function setWheelCustomizePricing($brand_id, $formula)
    {
        $url     = $this->app_url . "/" . 'brands/pricing/wheel/' . $brand_id;
        $request = $this->request->post($url, ['formula' => $formula]);

        return $request->json();
    }

    public function getTyreCustomizePricing()
    {
        $url     = $this->app_url . "/" . 'brands/pricing/tyre';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function setTyreCustomizePricing($supplier_id, $formula)
    {
        $url     = $this->app_url . "/" . 'brands/pricing/tyre/' . $supplier_id;
        $request = $this->request->post($url, ['formula' => $formula]);

        return $request->json();
    }

    public function getEnabledManufactures($nameOnly = false)
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers';
        $request = $this->request->get($url);

        $output = $request->json();

        if (!$nameOnly) {
            return $output;
        }

        if ($output['status'] != "success") {
            return [];
        }

        $manufactures = [];
        foreach ($output['manufacturers'] as $manufacture) {
            $manufactures[$manufacture['name']] = $manufacture['name'];
        }

        return $manufactures;
    }

    public function getManufacturerTaskStatus()
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getBrandTaskStatus()
    {
        $url     = $this->app_url . "/" . 'brands/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getTyreSupplierTaskStatus()
    {
        $url     = $this->app_url . "/" . 'tyres/suppliers/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getWheelCustomizePricingTaskStatus()
    {
        $url     = $this->app_url . "/" . 'brands/pricing/wheel/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getTyreCustomizePricingTaskStatus()
    {
        $url     = $this->app_url . "/" . 'brands/pricing/tyre/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getManufactures($nameOnly = false)
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers/all';
        $request = $this->request->get($url);

        $output = $request->json();

        if (!$nameOnly) {
            return $output;
        }

        if ($output['status'] != "success") {
            return [];
        }

        $manufactures = [];
        foreach ($output['manufacturers'] as $manufacture) {
            $manufactures[$manufacture['name']] = $manufacture['name'];
        }

        return $manufactures;
    }

    public function setToggleManufactures($manufacturer_id)
    {
        $url     = $this->app_url . "/" . 'vehicles/manufacturers/toggle/' . $manufacturer_id;
        $request = $this->request->post($url);

        return $request->json();
    }

    public function getEnabledBrands($nameOnly = false, $type = 'wheel')
    {
        $url     = $this->app_url . "/" . 'brands/enabled?type=' . $type;
        $request = $this->request->get($url);

        $output = $request->json();

        if (!$nameOnly) {
            return $output;
        }

        if ($output['status'] != "success") {
            return [];
        }

        $brands = [];
        foreach ($output['brands'] as $brand) {
            $brands[$brand['name']] = $brand['name'];
        }

        return $brands;
    }

    public function getBrands($nameOnly = false, $type = 'wheel')
    {
        $url     = $this->app_url . "/" . 'brands?type=' . $type;
        $request = $this->request->get($url);

        $output = $request->json();

        if (!$nameOnly) {
            return $output;
        }

        if ($output['status'] != "success") {
            return [];
        }

        $brands = [];
        foreach ($output['brands'] as $brand) {
            $brands[$brand['name']] = $brand['name'];
        }

        return $brands;
    }

    public function setEnabledBrands($brand_id)
    {
        $url     = $this->app_url . "/" . 'brands/toggle/' . $brand_id;
        $request = $this->request->post($url);

        return $request->json();
    }

    public function getWheelRange($range_id)
    {
        $url     = $this->app_url . '/wheels/range/' . $range_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function updateWheelRangeImages($range_id, $data)
    {
        $url     = $this->app_url . '/wheels/range/' . $range_id . '/images';
        $request = $this->request->post($url, $data);

        return $request->json();
    }

    public function getEnabledTyreSuppliers($nameOnly = false)
    {
        $url     = $this->app_url . "/" . 'tyres/suppliers/enabled';
        $request = $this->request->get($url);

        $output = $request->json();

        if (!$nameOnly) {
            return $output;
        }

        if ($output['status'] != "success") {
            return [];
        }

        $suppliers = [];
        foreach ($output['suppliers'] as $supplier) {
            $suppliers[$supplier['name']] = $supplier['name'];
        }

        return $suppliers;
    }

    public function getTyreSuppliers($nameOnly = false)
    {
        $url     = $this->app_url . "/" . 'tyres/suppliers';
        $request = $this->request->get($url);

        $output = $request->json();

        if (!$nameOnly) {
            return $output;
        }

        if ($output['status'] != "success") {
            return [];
        }

        $suppliers = [];
        foreach ($output['suppliers'] as $supplier) {
            $suppliers[$supplier['name']] = $supplier['name'];
        }

        return $suppliers;
    }

    public function setEnabledTyreSuppliers($supplier_id)
    {
        $url     = $this->app_url . "/" . 'tyres/suppliers/toggle/' . $supplier_id;
        $request = $this->request->post($url);

        return $request->json();
    }

    public function createClient($name)
    {
        $url     = $this->app_url . "/" . 'admin/new-client';
        $request = $this->request->post($url, ['name' => $name]);

        return $request->json();
    }

    public function generateData($front, $rear, $upsteps)
    {
        $url     = $this->app_url . '/admin/new-chassis/generate-data';
        $request = $this->request->post($url, ['front' => $front, 'rear' => $rear, 'upsteps' => $upsteps]);
        return $request->json();
    }

    public function addChassis($payload)
    {
        $url     = $this->app_url . '/admin/new-chassis/create';
        $request = $this->request->post($url, $payload);
        return $request->json();
    }

    public function deleteProduct($sku)
    {
        $url     = $this->app_url . '/admin/delete-product';
        $request = $this->request->post($url, ['product_code' => $sku]);
        return $request->json();
    }

    public function toggleVrm(Client $client, $enable)
    {
        $url     = $this->app_url . "/" . 'admin/' . $client->api_key . '/vrm';
        $request = $this->request->post($url, ['enabled' => $enable]);

        return $request->json();
    }


    public function getWheels($filter)
    {
        ray($filter);
        $key = 'wheel_search_' . json_encode($filter);
        if (Cache::has($key)) {
            return Cache::get($key);
        }

        $url_params = [];

        if (!empty($filter)) {
            foreach ($filter as $key => $value) {
                $url_params[$key] = $value;
            }
        }

        $url     = $this->app_url . "/" . 'search/wheels?' . http_build_query($url_params);
        $request = $this->request->get($url);

        Cache::put($key, $request->json(), 60*60);

        return $request->json();
    }

    public function getWheelResult($chassis_id, $front_wheel_id, $rear_wheel_id)
    {
        $key = 'wheel_search_result_' . json_encode([$chassis_id, $front_wheel_id, $rear_wheel_id]);
        if (Cache::has($key)) {
            return Cache::get($key);
        }

        $url_prams = [
            'wheel_id' => $front_wheel_id,
            'rear_wheel_id'  => $rear_wheel_id,
        ];

        if (empty($rear_wheel_id)) {
           unset($url_prams['rear_wheel_id']);
        }

        $url     = $this->app_url . "/" . 'search/wheels/' . $chassis_id . '?' . http_build_query($url_prams);
        $request = $this->request->get($url);

//        Cache::put($key, $request->json(), 60*60);

        return $request->json();
    }

    public function all_with_product_codes_no_images()
    {
        return $this->request->get($this->app_url . '/wheels/range/all_with_product_codes_no_images')->json()['products'];
    }

    public function getTyres($filter)
    {
        $url_params = [
            'ignore_no_stock' => 1,
            'ignore_no_price' => 1,
        ];

        if (!empty($filter)) {
            foreach ($filter as $key => $value) {
                $url_params[$key] = $value;
            }
        }

        $url     = $this->app_url . "/" . 'search/tyres?' . http_build_query($url_params);
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getTyre($tyre_id)
    {
        $url     = $this->app_url . "/" . 'tyres/id/' . $tyre_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getWheel($wheel_id)
    {
        $url     = $this->app_url . "/" . 'wheels/id/' . $wheel_id;
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getWheelByProductCode($product_code)
    {
        $url     = $this->app_url . "/" . 'wheels/product_code/';
        $request = $this->request->post($url, ['product_code' => $product_code]);

        return $request->json();
    }

    public function getWheelsChassis($wheel_id)
    {
        $url     = $this->app_url . "/" . 'wheels/id/' . $wheel_id . '/chassis';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getZeroBrands()
    {
        $url     = $this->app_url . "/" . 'brands/zero/';
        $request = $this->request->get($url);

        return $request->json();
    }

    /**
     * @param int     $brand_id
     * @param boolean $stock
     * @param boolean $price
     * @param bool    $disable
     *
     * @return array|mixed
     */
    public function setZeroBrands(int $brand_id, bool $stock, bool $price, bool $disable)
    {
        $url     = $this->app_url . "/" . 'brands/zero/' . $brand_id;
        $request = $this->request->post($url, [
            'zero_stock' => $stock,
            'zero_price' => $price,
            'disable'    => $disable
        ]);

        return $request->json();
    }

    public function getZeroBrandsCheckTask()
    {
        $url     = $this->app_url . "/" . 'brands/zero/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }

    public function getZeroTyreSuppliers()
    {
        $url     = $this->app_url . "/" . 'tyre-supplier/zero/';
        $request = $this->request->get($url);

        return $request->json();
    }

    /**
     * @param int  $tyre_supplier_id
     * @param bool $stock_brands
     * @param bool $price_brands
     * @param bool $disable
     *
     * @return array|mixed
     */
    public function setZeroTyreSuppliers(int $tyre_supplier_id, bool $stock_brands, bool $price_brands, bool $disable)
    {
        $url     = $this->app_url . "/" . 'tyre-supplier/zero/' . $tyre_supplier_id;
        $request = $this->request->post($url, [
            'zero_stock' => $stock_brands,
            'zero_price' => $price_brands,
            'disable'    => $disable
        ]);

        return $request->json();
    }

    public function getZeroTyreSuppliersCheckTask()
    {
        $url     = $this->app_url . "/" . 'tyre-supplier/zero/check-task';
        $request = $this->request->get($url);

        return $request->json();
    }
}
