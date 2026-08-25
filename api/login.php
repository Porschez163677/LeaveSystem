<?php
require __DIR__ . '/db.php';

$body = json_decode(file_get_contents('php://input'), true) ?? [];
$employeeid = $body['employeeid'] ?? '';
$password = $body['password'] ?? '';

if ($employeeid === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['message' => 'กรุณากรอกรหัสบุคลากรและรหัสผ่าน']);
    exit;
}

$stmt = $pdo->prepare(
    'SELECT employeeid, fullname, managerid FROM tb_employee WHERE employeeid = ? AND password = ?'
);
$stmt->execute([$employeeid, $password]);
$employee = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$employee) {
    http_response_code(401);
    echo json_encode(['message' => 'รหัสบุคลากรหรือรหัสผ่านไม่ถูกต้อง']);
    exit;
}

echo json_encode($employee);
