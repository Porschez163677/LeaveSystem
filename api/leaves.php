<?php
require __DIR__ . '/db.php';

$employeeid = $_GET['employeeid'] ?? '';
if ($employeeid === '') {
    http_response_code(400);
    echo json_encode(['message' => 'ต้องระบุ employeeid']);
    exit;
}

$stmt = $pdo->prepare(
    "SELECT f.leaveid,
            DATE_FORMAT(f.leave_from_date, '%Y-%m-%d') AS leave_from_date,
            DATE_FORMAT(f.leave_to_date, '%Y-%m-%d') AS leave_to_date,
            f.typeid, t.typename, f.reason
     FROM tb_leaveform f
     LEFT JOIN tb_leavetype t ON t.typeid = f.typeid
     WHERE f.employeeid = ?
     ORDER BY f.leaveid DESC"
);
$stmt->execute([$employeeid]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
