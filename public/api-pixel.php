<?php
// api-pixel.php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$pixel_id = '8773301692756198'; 
$access_token = 'EAAWd7WQaZByQBSzZCmTIeT5WeCpuu8y2Qw4ZA9uD92C7XOGBeQRdcICqaTZAXKxxoPp8FWrNSBqEdUOeoPLbrhKD5LP0xZBn70amZCBwWJ6hUAFG2R6FIr9K41T5L3EoGY6aZAG6Al4wwwYZBHVdUEQPL5TpnpCMcjVo3UbAJx9EPDIpdumZATHMh5pvJ41hECwZDZD';

if (empty($pixel_id) || empty($access_token)) {
    exit; 
}

// CORREÇÃO DA LOVABLE: Pega o texto bruto e limpa a URL perfeitamente
$raw_input = file_get_contents('php://input');

$url_atual = '';
if (!empty($raw_input)) {
    $input = json_decode($raw_input, true);
    if (isset($input['url'])) {
        $url_atual = $input['url'];
    } else {
        if (preg_match('/"url"\s*:\s*"([^"]+)"/', $raw_input, $matches)) {
            $url_atual = $matches[1];
        } else {
            $url_atual = trim($raw_input);
        }
    }
}

// Se o texto vier vazio ou sem protocolo, força a URL base do seu domínio
if (empty($url_atual) || strpos($url_atual, 'http') === false) {
    $url_atual = 'https://everydaysolutionslab.com';
}

$payload = [
    'data' => [
        [
            'event_name' => 'PageView',
            'event_time' => time(),
            'action_source' => 'website',
            'event_source_url' => $url_atual,
            'user_data' => new stdClass() 
        ]
    ]
];

// LINK CORRIGIDO DA GRAPH API DA META (Modo de teste removido para computar nas campanhas reais)
$ch = curl_init("https://facebook.com{$pixel_id}/events?access_token={$access_token}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);
curl_close($ch);
