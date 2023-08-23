@if (!empty($data) && is_array($data) && isset($data['results']))
    @foreach ($data['results'] as $item)
        @if (isset($item['range']['id']))
            @if (isset($item['package_price']) && $item['package_price'] != 0)
                <a href="{{$boughto_wheel_page}}?wheel_id=@if(isset($item['id'])){{$item['id']}}@elseif(isset($item['front']['id'])){{ $item['front']['id'] }}@endif{{ $chassis_id != null ? "&chassis=".$chassis_id : ''  }}&rear_wheel_id=@if(isset($item['rear']['id'])){{$item['rear']['id']}}@endif"
                   class="CardMain_Box" rear-data=""
                   front-data="@if(isset($item['front']['id'])){{$item['front']['id']}}@endif">
                    @else
                        <a href="{{$boughto_wheel_page}}?wheel_id=@if(isset($item['id'])) {{$item['id']}}@elseif(isset($item['front']['id'])){{ $item['front']['id'] }}@endif"
                           class="CardMain_Box">
                            @endif
                            <div class="CardMain_Box_">
                                <img src="{{ $item['range']['image_url'] }}"/>
                            </div>
                            <div class="CardMain_Box_B">
                                <div class="CardMain_Box_B_">
                                    <p>
                                        {{ $item['range']['brand']['name'] }}
                                        <br/>
                                        {{ $item['range']['design'] }} ({{ $item['range']['finish'] }})
                                    </p>
                                    <ul>
                                        @if (isset($item['width']) && isset($item['diameter']))
                                            <li>{{ number_format($item['width'], 1) }}
                                                x {{ number_format($item['diameter'], 0) }}"
                                            </li>
                                            <span></span>
                                        @endif
                                        @if (isset($item['pcds']) && is_array($item['pcds']))
                                            @foreach ($item['pcds'] as $pcd)
                                                <li>{{ $pcd['pcd'] }}</li>
                                                <span></span>
                                            @endforeach
                                        @endif
                                        @if (isset($item['offset_et']))
                                            <li>ET{{ number_format($item['offset_et'], 0) }}</li>
                                        @endif
                                    </ul>
                                    @if(isset($item['front']['width']))
                                        <ul>
                                            <li>F: {{ isset($item['front']['width']) ? ($item['front']['width']) : '' }}
                                                x
                                                {{ isset($item['front']['diameter']) ? intval($item['front']['diameter']) . '"' : '' }}
                                            </li>
                                            <span></span>
                                            <li>
                                                {{ isset($item['front']['pcds'][0]['holes']) ? ($item['front']['pcds'][0]['holes']) : '' }}
                                                x
                                                {{ isset($item['front']['pcds'][0]['bcd']) ? intval($item['front']['pcds'][0]['bcd'])  : '' }}
                                            </li>
                                            <span></span>
                                            <li>
                                                {{ isset($item['front']['offset_et']) ? intval($item['front']['offset_et']) : '' }}
                                                ET
                                            </li>
                                        </ul>
                                        <br>
                                        <ul class="rear_ul" style="margin-top: -86px;">
                                            <li>R: {{ isset($item['rear']['width']) ? ($item['rear']['width']) : '' }} x
                                                {{ isset($item['rear']['diameter']) ? intval($item['rear']['diameter']) . '"' : '' }}
                                            </li>
                                            <span></span>
                                            <li>
                                                {{ isset($item['rear']['pcds'][0]['holes']) ? ($item['rear']['pcds'][0]['holes']) : '' }}
                                                x
                                                {{ isset($item['rear']['pcds'][0]['bcd']) ? intval($item['rear']['pcds'][0]['bcd'])  : '' }}

                                            </li>
                                            <span></span>
                                            <li>
                                                {{ isset($item['rear']['offset_et']) ? intval($item['rear']['offset_et']) : '' }}
                                                ET
                                            </li>
                                        </ul>
                                    @endif


                                </div>
                                @if (isset($item['package_price']) AND $item['package_price'] != 0)
                                    <div class="CardMain_Box_BB "><span>From:</span>
                                        £{{ number_format($item['package_price'], 2) }}</div>
                                @else
                                    <div class="CardMain_Box_BB"> Call for pricing</div>
                                @endif
                            </div>
                        </a>
                    @endif
                    @endforeach
                    @else
                        <div class="CardMain_Box_BB"> Data not found</div>
            @endif
