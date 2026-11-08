<?php
// api-pixel.php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Pega o ID e o Token do domínio da Hostinger
$pixel_id = $_ENV['META_PIXEL_ID'] ?? getenv('META_PIXEL_ID');
$access_token = $_ENV['META_ACCESS_TOKEN'] ?? getenv('META_ACCESS_TOKEN');

if (!$pixel_id || !$access_token) {
    exit;
}

// CORREÇÃO DA LOVABLE: Lê o corpo como texto bruto (raw data)
$raw_input = file_get_contents('php://input');

// Tenta decodificar o JSON vindo como texto
$input = json_decode($raw_input, true);
$url_atual = $input['url'] ?? '';

// Se por acaso veio como formato de texto comum (raw string), limpa o JSON manualmente
if (empty($url_atual) && strpos($raw_input, '"url":') !== false) {
    preg_match('/"url"\s*:\s*"([^"]+)"/', $raw_input, $matches);
    $url_atual = $matches[1] ?? '';
}

if (empty($url_atual)) {
    exit; // Se não achou URL, para o script de forma segura
}

// Payload do PageView sem nenhum dado sensível
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

// Dispara para a Meta CAPI com a URL oficial corrigida e incluindo o seu código de teste TEST2577
$ch = curl_init("https://facebook.com{$pixel_id}/events?access_token={$access_token}&test_event_code=TEST2577");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$response = curl_exec($ch);
curl_close($ch);
