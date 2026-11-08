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

// CORREÇÃO DA LOVABLE: Pega o texto bruto e acha a URL de qualquer jeito
$raw_input = file_get_contents('php://input');

$url_atual = '';
if (!empty($raw_input)) {
    // Tenta ler como JSON padrão
    $input = json_decode($raw_input, true);
    if (isset($input['url'])) {
        $url_atual = $input['url'];
    } else {
        // Se a Lovable mandou como texto puro limpo, limpa as aspas e chaves na marra
        preg_match('/"url"\s*:\s*"([^"]+)"/', $raw_input, $matches);
        if (isset($matches[1])) {
            $url_atual = $matches[1];
        } else {
            // Se veio apenas o link direto no texto
            $url_atual = trim($raw_input);
        }
    }
}

// Se mesmo assim não achar a URL, usa o endereço padrão do seu site para o disparo não falhar
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

$ch = curl_init("https://facebook.com{$pixel_id}/events?access_token={$access_token}&test_event_code=TEST2577");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);
curl_close($ch);
