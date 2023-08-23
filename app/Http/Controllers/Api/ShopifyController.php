<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use App\Models\ShopifyAccessToken;
use Illuminate\Support\Facades\Validator;


class ShopifyController extends Controller
{
    private function getDomainFromReferer(Request $request)
    {
        $referer = $request->header('referer');
        $domain = Str::after(parse_url($referer, PHP_URL_HOST), 'www.');
        return $domain;
    }


    private $token;
    private $boughto_wheel_page;
    private $boughto_wheel_search;
    private $apiurl;
    private $myshopifytoken;

    public function __construct(Request $request)
    {
        $domain = $this->getDomainFromReferer($request);
        $accessTokenData = '';
        if ($domain != '') {
            $accessTokenData = ShopifyAccessToken::where('url', 'LIKE', '%' . $domain . '%')->first();
        }
        if ($accessTokenData) {
            $boughto_wheel_search = $accessTokenData->boughto_wheel_search;
            $boughto_wheel_page = $accessTokenData->boughto_wheel_page;
            $accessToken = $accessTokenData->access_token;
            $api = $accessTokenData->api_url;
            $order_token = $accessTokenData->shopify_access_token;
        } else {
            $boughto_wheel_search = '';
            $boughto_wheel_page = '';
            $accessToken = '';
            $api = 'https://boughtofeed.co.uk/api';
            $order_token = '';
        }

        $this->token = $accessToken;
        $this->boughto_wheel_page = $boughto_wheel_page;
        $this->boughto_wheel_search = $boughto_wheel_search;
        $this->apiurl = $api;
        $this->myshopifytoken = $order_token;
    }

    public function index(Request $request)
    {
        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/manufacturers';
        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        $response['boughto_wheel_search'] = $this->boughto_wheel_search;
        return $response;
        if ($response['status'] === 'success') {
            $data = $response;
        } else {
            $data = [
                'status' => false,
                'massage' => error_get_last()['message'],
            ];
        }

        return response()->json($data, 200);
    }

    private function buildQueryString(array $params, $prefix = ''): string
    {
        $parts = [];
        foreach ($params as $key => $value) {
            $name = $prefix ? "{$prefix}[{$key}]" : $key;
            if (is_array($value)) {
                $parts[] = $this->buildQueryString($value, $name);
            } else {
                $encodedValue = urlencode($value);
                // Replace spaces with '+'
                $encodedValue = str_replace('%20', '+', $encodedValue);
                $parts[] = urlencode($name) . '=' . $encodedValue;
            }
        }
        return implode('&', $parts);
    }

    public function search($id, Request $request)
    {


        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/manufacturers/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function models($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/manufacturers/' . $id . '/models';

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function models_search($id, Request $request)
    {


        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/models/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function generations($id, Request $request)
    {


        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/models/' . $id . '/generations';

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function generation_search($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/generations/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function chassis($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/manufacturers/' . $id . '/chassis';

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function generations_serach($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/generations/' . $id . '/chassis';

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function vehicles($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/vehicles/chassis/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function enabled(Request $request)
    {
        $endpoint = 'https://boughtofeed.co.uk/api/brands/enabled';

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function brand_name($name, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/wheels/brand/' . $name;
        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function range($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/wheels/range/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $nextId = null;
        $previousId = null;
        $productsWithSameDesign = [];
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {

            if ($response['status'] === 'success') {
                $datas = $response;
                if (isset($datas['range']['brand']['name'])) {
                    $name = $datas['range']['brand']['name'];
                    $design = $datas['range']['design'];
                    $endpoint = 'https://boughtofeed.co.uk/api/wheels/brand/' . $name;
                    $context = stream_context_create([
                        'http' => [
                            'header' => "Authorization: Bearer $this->token\r\n"
                        ]
                    ]);
                    $responseJson = @file_get_contents($endpoint, false, $context);
                    $responses = json_decode($responseJson, true);
                    if (isset($responses)) {
                        if ($responses['status'] === 'success') {
                            $wheelProducts = $responses['ranges'];
                            $foundCurrentId = false;
                            foreach ($wheelProducts as $wheel) {
                                if ($wheel['design'] === $design) {
                                    $productsWithSameDesign[] = $wheel;
                                }

                                if ($wheel['id'] < $id) {
                                    $previousId = $wheel['id'];
                                }
                            }

                            foreach ($wheelProducts as $wheel) {
                                if ($foundCurrentId) {
                                    $nextId = $wheel['id'];
                                    break;
                                }

                                if ($wheel['id'] == $id) {
                                    $foundCurrentId = true;
                                    continue;
                                }
                            }
                        }
                    }
                }
                $data['status'] = $response['status'];
                $data['range'] = $response['range'];
                $data['nextId'] = $nextId;
                $data['previousId'] = $previousId;
                $data['SameDesign'] = $productsWithSameDesign;

            }

        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function createWheelSearchResultsFilter($data)
    {
        $filter = array();

        if (isset($data->chassis)) {
            $filter['chassis_id'] = (int)$data->chassis;
        }
        if (isset($data->wheel_id)) {
            $filter['wheel_id'] = (int)$data->wheel_id;
        }

        if (isset($data->chassis_id)) {
            $filter['chassis_id'] = (int)$data->chassis_id;
        }

        if (isset($data->sort) && !empty($data->sort)) {
            $filter['sort'] = $data->sort;
        }

        if (isset($data->diameter) && !empty($data->diameter) && strtolower($data->diameter) !== "all") {
            $filter['diameter'] = $data->diameter;
        }

        if (isset($data->width) && is_numeric($data->width)) {
            $filter['width'] = (float)$data->width;
        }

        if (isset($data->brand) && !empty($data->brand)) {
            $filter['brand'] = $data->brand;
        }

        if (isset($data->design) && !empty($data->design)) {
            $filter['design'] = $data->design;
        }

        if (isset($data->style) && !empty($data->style)) {
            $filter['style'] = $data->style;
        }

        if (isset($data->colour) && !empty($data->colour)) {
            $filter['colour'] = $data->colour;
        }

        if (isset($data->offset) && is_numeric($data->offset)) {
            $filter['offset'] = $data->offset;
        }

        if (isset($data->pcd) && !empty($data->pcd)) {
            $filter['pcd'] = $data->pcd;
        }

        if (isset($data->staggeredOnly) && is_numeric($data->staggeredOnly)) {
            $filter['staggered_only'] = $data->staggeredOnly;
        }


        if (isset($data->only_hand_matched) && is_numeric($data->only_hand_matched)) {
            $filter['only_hand_matched'] = $data->only_hand_matched;
        }

        if (isset($data->range_id) && is_numeric($data->range_id)) {
            $filter['range_id'] = $data->range_id;
        }

        if (isset($data->page)) {
            $data->_page = $data->page;
        }

        if (!isset($data->_page)) {
            $data->_page = 1;
        }

        if (isset($data->_page) && !empty($data->_page)) {
            $filter['page'] = $data->_page;
        }

        return $filter;
    }

    private function get_plugin_settings(): array
    {
        return [
            'show_wheels_no_price' => false,
            'show_wheels_no_stock' => false,
            'buy_wheels_no_stock' => false,
            'group_wheel_results_lowest_offset' => true,
            'use_load_rating' => false,
            'allow_blank_pcd' => true,
        ];
    }


    public function search_wheels(Request $request)
    {
        $filter = $this->createWheelSearchResultsFilter($request);

        $params = $this->get_plugin_settings();

        $filter['ignore_no_price'] = $params['show_wheels_no_price'] ? 1 : 0;
        $filter['ignore_no_stock'] = $params['show_wheels_no_stock'] ? 1 : 0;
        $filter['grouped_offset'] = $params['group_wheel_results_lowest_offset'] ? 1 : 0;
        $filter['use_load_rating'] = $params['use_load_rating'] ? 1 : 0;
        $filter['ignore_no_pcd'] = $params['allow_blank_pcd'] ? 1 : 0;

        $queryParameters = $request->query();
        $endpoint = 'https://boughtofeed.co.uk/api/search/wheels';

        $chassis_id = null;

        $queryString = '';
        if (!empty($queryParameters)) {
            foreach ($filter as $filter_key => $filter_value) {
                if (!empty($queryString)) {
                    $queryString .= '&';
                }

                if ($filter_key == 'chassis_id') {
                    $chassis_id = $filter_value;
                }

                $encodedValue = urlencode($filter_value);
                // Replace spaces with '+'
                $encodedValue = str_replace('%20', '+', $encodedValue);
                $queryString .= $filter_key . '=' . $encodedValue;
            }
            $endpoint .= '?' . $queryString;
        }

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);

        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        // return $response
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
                $html = View::make('boughto.product', ['data' => $data, 'chassis_id' => $chassis_id, 'boughto_wheel_page' => $this->boughto_wheel_page])->render();
                $data['product'] = $html;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function search_wheelsid($id, Request $request)
    {
        $endpoint = 'https://boughtofeed.co.uk/api/search/wheels/' . $id;

        $queryParameters = $request->query();

        $params = $this->get_plugin_settings();

        $queryParameters['ignore_no_price'] = $params['show_wheels_no_price'] ? 1 : 0;
        $queryParameters['ignore_no_stock'] = $params['show_wheels_no_stock'] ? 1 : 0;
        $queryParameters['grouped_offset'] = $params['group_wheel_results_lowest_offset'] ? 1 : 0;
        $queryParameters['use_load_rating'] = $params['use_load_rating'] ? 1 : 0;
        $queryParameters['ignore_no_pcd'] = $params['allow_blank_pcd'] ? 1 : 0;

        if (!empty($queryParameters)) {
            $queryString = $this->buildQueryString($queryParameters);
            $endpoint .= '?' . $queryString;
        }

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response['status'] === 'success') {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function wheels_wheels($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/wheels/id/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function product_code($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/wheels/product_code/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    // search_tyres
    public function search_tyres(Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/search/tyres';

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function search_id($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/tyres/id/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function product_id($id, Request $request)
    {

        $endpoint = 'https://boughtofeed.co.uk/api/tyres/product_code/' . $id;

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    // chassis_id
    public function chassis_id($id, Request $request)
    {
        $endpoint = 'https://boughtofeed.co.uk/api/search/wheels?ignore_no_price=1&ignore_no_stock=1&chassis_id=' . $id;

        $queryParameters = $request->query();

        $params = $this->get_plugin_settings();

        $queryParameters['ignore_no_price'] = $params['show_wheels_no_price'] ? 1 : 0;
        $queryParameters['ignore_no_stock'] = $params['show_wheels_no_stock'] ? 1 : 0;
        $queryParameters['grouped_offset'] = $params['group_wheel_results_lowest_offset'] ? 1 : 0;
        $queryParameters['use_load_rating'] = $params['use_load_rating'] ? 1 : 0;
        $queryParameters['ignore_no_pcd'] = $params['allow_blank_pcd'] ? 1 : 0;

        if (!empty($queryParameters)) {
            $queryString = $this->buildQueryString($queryParameters);
            $endpoint .= '?' . $queryString;
        }
        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $unique_rim_values = array();
                if (isset($response['filters'])) {
                    if (isset($response['filters']['diameter'])) {
                        if (isset($response['filters']['diameter']['options'])) {
                            foreach ($response['filters']['diameter']['options'] as $resp_key => $resp_value) {
                                $unique_rim_values[] = $resp_value['key'];
                            }
                        }
                    }
                }
                $data = [
                    'status' => 'success',
                    'massage' => $unique_rim_values,
                ];
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'You have not enabled this manufacturer.',
            ];
        }

        return response()->json($data, 200);
    }

    public function chassis_search($id, Request $request)
    {


        $endpoint = 'https://boughtofeed.co.uk/api/search/wheels/' . $id . '/tyres';

        $queryParameters = $request->query();

        if (!empty($queryParameters)) {
            $queryString = $this->buildQueryString($queryParameters);
            $endpoint .= '?' . $queryString;
        }
        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $response = json_decode($responseJson, true);
        if (isset($response)) {
            if ($response != null) {
                $data = $response;
            }
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'Could not find wheel.',
            ];
        }

        return response()->json($data, 200);
    }

    public function check_url($data)
    {
        $site = DB::table('sites')
            ->where('site_url', 'LIKE', '%' . $data . '%')
            ->first();
        if (!empty($site)) {
            $data = [
                'status' => 'success',
                'massage' => $site->auth_token
            ];
            return $data;
        } else {
            $data = [
                'status' => 'error',
                'massage' => 'site has been not found.',
            ];
            return $data;
        }
    }

    public function input(Request $request)
    {
        $html = View::make('boughto.serachinput')->render();
        $data = [
            'status' => 'success',
            'massage' => $html
        ];
        return response()->json($data, 200);

    }

    public function createDraftOrder(Request $request)
    {
        $data = $request->all();

        if (empty($data['cart_item'])) {
            return response()->json(['status' => 'error', 'message' => 'An error occurred'], 500);
        }

        $lineItems = [];
        foreach ($data['cart_item'] as $product) {
            $lineItems[] = [
                'title' => $product['title'],
                'price' => $product['price'],
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'image_url' => $product['image_url'],
                'requires_shipping' => true,
                'taxable' => true,
                'sku' => $product['sku'],
                'properties' => [
                    [
                        'name' => 'vehicle',
                        'value' => $product['chassis']
                    ]
                ],
            ];
        }
        $draft_order_data = [
            'draft_order' => [
                'line_items' => $lineItems,
                'use_customer_default_address' => true,
            ],
        ];

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $this->myshopifytoken,
            ])
                ->asJson()
                ->post("https://sid-boughto.myshopify.com/admin/api/2023-01/draft_orders.json", $draft_order_data);

            if ($response->successful()) {
                $draftOrder = $response->json()['draft_order'];
                return response()->json(['status' => 'success', 'message' => 'Draft order created successfully', 'draft_order' => $draftOrder], 200);

            } else {
                return response()->json(['message' => 'Failed to create draft order', 'error' => $response->json()], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function add_to_cart(Request $request)
    {
        $items = $request->cart_item;
        $items = str_replace("'", '"', $items);
        $items = json_decode($items);
        $responseArray = [];
        foreach ($items as $id) {
            $endpoint = 'https://boughtofeed.co.uk/api/wheels/id/' . $id;
            $context = stream_context_create([
                'http' => [
                    'header' => "Authorization: Bearer $this->token\r\n"
                ]
            ]);
            $responseJson = @file_get_contents($endpoint, false, $context);
            if ($responseJson !== false) {
                $response = json_decode($responseJson, true);
                $responseArray[] = $response;
            } else {
                $responseArray[] = [
                    'status' => 'error',
                    'massage' => $id . ' Could not find wheel.',
                ];
            }
        }
        return response()->json(['responses' => $responseArray], 200);

    }

    public function custom_css()
    {
        $values = [
            'primary_hex' => '#ff0000',
            'primary_action_hex' => '#cd0101',
            'secondary_hex' => '#282a2b',
            'secondary_action_hex' => '#222424',
            'text_hex' => '#fff',
        ];

        $css = ':root {';
        foreach ($values as $key => $value) {
            $css .= '--boughto_' . $key . ': ' . $value . ';';
        }
        $css .= '}';
        return response($css, 200)->header('Content-Type', 'text/css');
    }

    public function fillter(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
            'filter_url' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $paramsString = $request->filter_url;
        parse_str($paramsString, $data);

        // Convert diameter and style values to match your original data format
        // $data['diameter'] = str_replace('+', ' ', $data['diameter']);
        // $data['style'] = str_replace('+', ' ', $data['style']);
        $filter = $this->createWheelSearchResultsFilter((object)$data);

        $params = $this->get_plugin_settings();

        $filter['ignore_no_price'] = $params['show_wheels_no_price'] ? 1 : 0;
        $filter['ignore_no_stock'] = $params['show_wheels_no_stock'] ? 1 : 0;
        $filter['grouped_offset'] = $params['group_wheel_results_lowest_offset'] ? 1 : 0;
        $filter['use_load_rating'] = $params['use_load_rating'] ? 1 : 0;
        $filter['ignore_no_pcd'] = $params['allow_blank_pcd'] ? 1 : 0;

        $queryParameters = $request->query();
        $endpoint = 'https://boughtofeed.co.uk/api/search/wheels';

        $queryString = '';

        foreach ($filter as $filter_key => $filter_value) {
            if (!empty($queryString)) {
                $queryString .= '&';
            }
            $encodedValue = urlencode($filter_value);

            // Replace spaces with '+'
            $encodedValue = str_replace('%20', '+', $encodedValue);
            $queryString .= $filter_key . '=' . $encodedValue;
        }
        $endpoint .= '?' . $queryString;


        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Bearer $this->token\r\n"
            ]
        ]);
        $responseJson = @file_get_contents($endpoint, false, $context);
        $responses = json_decode($responseJson, true);
        $product = array();
        // return $responses['results'];
        foreach ($responses['results'] as $req) {
            if (isset($req['id']) && $req['id'] == $request->product_id) {
                $product[] = $req;
            } elseif (isset($req['front']['id']) && $req['front']['id'] == $request->product_id) {
                return $req;
            }

        }
        return response()->json(['data' => $product], 200);

    }
}
