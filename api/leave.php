<?php
require __DIR__ . '/db.php';

$body = json_decode(file_get_contents('php://input'), true) ?? [];
$employeeid = $body['employeeid'] ?? '';
$leaveFromDate = $body['leave_from_date'] ?? '';
$leaveToDate = $body['leave_to_date'] ?? '';
$typeid = $body['typeid'] ?? '';
$reason = $body['reason'] ?? null;

if ($employeeid === '' || $leaveFromDate === '' || $leaveToDate === '' || $typeid === '') {
    http_response_code(400);
    echo json_encode(['message' => 'กรุณากรอกข้อมูลให้ครบถ้วน']);
    exit;
}

$year = date('Y', strtotime($leaveFromDate));

$stmt = $pdo->prepare("SELECT COUNT(*) FROM tb_leaveform WHERE leaveid LIKE ?");
$stmt->execute(["$year%"]);
$count = (int) $stmt->fetchColumn();
$leaveid = $year . str_pad((string) ($count + 1), 3, '0', STR_PAD_LEFT);

$stmt = $pdo->prepare(
    'INSERT INTO tb_leaveform (leaveid, leave_from_date, leave_to_date, employeeid, typeid, reason)
     VALUES (?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$leaveid, $leaveFromDate, $leaveToDate, $employeeid, $typeid, $reason]);

http_response_code(201);
echo json_encode(['leaveid' => $leaveid]);
