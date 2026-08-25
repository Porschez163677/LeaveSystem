<?php
require __DIR__ . '/db.php';

$stmt = $pdo->query('SELECT typeid, typename FROM tb_leavetype ORDER BY typeid');
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
