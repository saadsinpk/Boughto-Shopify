<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class BoughtoController extends Controller
{
    protected $token;
    protected $apiUrl;

    public function __construct()
    {
        $this->token = 'YourTokenHere';
        $this->apiUrl = 'https://boughtofeed.co.uk/api/';
    }

    public function fetchFromApi($endpoint, $id = null, $queryParameters = [])
    {
        $url = $this->apiUrl . $endpoint;
        if ($id) {
            $url .= $id;
        }
        if (!empty($queryParameters)) {
            $url .= '?' . http_build_query($queryParameters);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->get($url);

        if ($response->successful()) {
            return [
                'status' => 'success',
                'data' => $response->json(),
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Could not fetch data from the API.',
            ];
        }
    }

    public function search_tyres(Request $request)
    {
        return response()->json($this->fetchFromApi('search/tyres'), 200);
    }

    public function search_id($id, Request $request)
    {
        return response()->json($this->fetchFromApi('tyres/id/', $id), 200);
    }

    public function product_id($id, Request $request)
    {
        return response()->json($this->fetchFromApi('tyres/product_code/', $id), 200);
    }

    public function chassis_id($id, Request $request)
    {
        $response = $this->fetchFromApi('vehicles/chassis/' . $id . '/tyre-sizes');
        if ($response['status'] == 'success' && isset($response['data']['tyres'])) {
            $unique_rim_values = collect($response['data']['tyres'])->pluck('rim')->unique()->values();
            $response['data'] = $unique_rim_values;
        }
        return response()->json($response, 200);
    }

    public function chassis_search($id, Request $request)
    {
        return response()->json($this->fetchFromApi('search/wheels/' . $id . '/tyres', null, $request->query()), 200);
    }

    public function check_url($data)
    {
        $site = DB::table('sites')
            ->where('site_url', 'LIKE', '%' . $data . '%')
            ->first();

        if ($site) {
            return [
                'status' => 'success',
                'message' => $site->auth_token,
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Site not found.',
            ];
        }
    }
}
