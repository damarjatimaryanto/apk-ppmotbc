<?php
error_reporting(0);
$conn = mysqli_connect('localhost', 'afanalfi_ppmo', '2_dF&CjN]0;u', 'afanalfi_ppmo');
$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$op = $_GET['op'];
switch ($op) {
    case 'login':
        login();
        break;
    case 'register':
        register();
        break;
    case 'insAlarm':
        insAlarm();
        break;
    case 'insAlarmLanjutan':
        insAlarmLanjutan();
        break;
    case 'getData':
        getData();
        break;
    case 'getKategori':
        getKategori();
        break;
    case 'getFase':
        getFase();
        break;
    case 'getFaseDetail':
        getFaseDetail();
        break;
    case 'getAlarm':
        getAlarm();
        break;
    case 'getObat':
        getObat();
        break;
    case 'submitAlarm':
        submitAlarm();
        break;
    case 'getHari':
        getHari();
        break;
    case 'getHariAlarm':
        getHariAlarm();
        break;
    case 'getToday':
        getToday();
        break;
    case 'getRiwayat':
        getRiwayat();
        break;
    case 'selectDate':
        selectDate();
        break;
    case 'getPresentase':
        getPresentase();
        break;
}

function login()
{
    global $conn;
    global $json;
    global $obj;

    $username = $obj['username'];
    $password = md5($obj['password']);

    $sql = mysqli_query($conn, "SELECT * FROM user 
    JOIN kategori_detail ON user.id_kategori_detail = kategori_detail.id_kategori_detail
    WHERE username = '$username' AND password = '$password'");
    $row = mysqli_fetch_array($sql);

    if ($row > 1) {
        $result = array(
            'id_user' => $row['id_user'],
            'id_kategori_detail' => $row['id_kategori_detail'],
            'nama' => $row['nama'],
            'username' => $row['username'],
            'kategori' => $row['kategori'],
            'fase' => $row['fase'],
        );
    } else {
        $result = '0';
    }

    echo json_encode($result);
}

function register()
{
    global $conn;
    global $json;
    global $obj;

    $nama = $obj['nama'];
    $kategori = $obj['kategori'];
    $fase = $obj['fase'];
    $username = $obj['username'];
    $password = md5($obj['password']);

    $sql = mysqli_query($conn, "INSERT INTO user 
    (id_kategori_detail, id_fase_detail, username, password, nama) 
    VALUES ('$kategori','$fase','$username','$password','$nama')");

    if ($sql) {
        $result = '1';
    } else {
        $result = '0';
    }

    echo json_encode($result);
}

function insAlarm()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];
    $jam = $obj['jam'];
    $hari = $obj['hari'];
    $fase = $obj['fase'];
    $start = $obj['start'];
    $end = $obj['end'];

    $sql = mysqli_query($conn, "INSERT INTO alarm(id_user, jam, hari,start,end,id_fase_detail) VALUES('$id','$jam','$hari','$start','$end','$fase')");

    if ($sql) {
        $result = '1';
    } else {
        $result = '0';
    }

    echo json_encode($result);
}

function insAlarmLanjutan()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];
    $jam = $obj['jam'];
    $hari_satu = $obj['hari_satu'];
    $hari_dua = $obj['hari_dua'];
    $hari_tiga = $obj['hari_tiga'];
    $fase = $obj['fase'];
    $start = $obj['start'];
    $end = $obj['end'];

    $sql = mysqli_query($conn, "INSERT INTO alarm_lanjutan(id_user, jam, hari_satu, hari_dua, hari_tiga, start, end, id_fase_detail) 
    VALUES('$id','$jam','$hari_satu','$hari_dua','$hari_tiga','$start','$end','$fase')");

    if ($sql) {
        $result = '1';
    } else {
        $result = '0';
    }

    echo json_encode($result);
}


function getData()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT * FROM riwayat
    JOIN status_detail ON riwayat.id_status_detail = status_detail.id_status_detail
    WHERE id_user = '$id'");

    while ($row = mysqli_fetch_array($sql)) {
        $result[] = array(
            'status' => $row['status'],
            'hari' => $row['hari'],
            'tgl' => $row['tgl'],
        );
    };

    echo json_encode($result);
}

function getKategori()
{
    global $conn;
    global $json;
    global $obj;

    $sql = mysqli_query($conn, "SELECT * FROM kategori_detail ORDER BY kategori ASC");

    while ($row = mysqli_fetch_array($sql)) {
        $result[] = array(
            'id_kategori_detail' => $row['id_kategori_detail'],
            'kategori' => $row['kategori'],
        );
    };

    echo json_encode($result);
}
function getFase()
{
    global $conn;
    global $json;
    global $obj;

    $sql = mysqli_query($conn, "SELECT * FROM fase_detail ORDER BY fase ASC");

    while ($row = mysqli_fetch_array($sql)) {
        $result[] = array(
            'id_fase_detail' => $row['id_fase_detail'],
            'fase' => $row['fase'],
        );
    };

    echo json_encode($result);
}

function getFaseDetail()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];
    $sql = mysqli_query($conn, "SELECT * FROM fase_detail WHERE id_fase_detail = '$id' ORDER BY fase ASC");

    while ($row = mysqli_fetch_array($sql)) {
        $result[] = array(
            'id_fase_detail' => $row['id_fase_detail'],
            'fase' => $row['fase'],
            'lama_pengobatan' => $row['lama_pengobatan'],
        );
    };

    echo json_encode($result);
}

function getAlarm()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT * FROM alarm
    WHERE id_user = '$id'");

    $row = mysqli_fetch_array($sql);

    if ($row > 0) {
        $result = array(
            'id_alarm' => $row['id_alarm'],
            'id_user' => $row['id_user'],
            'jam' => $row['jam'],
            'hari' => $row['hari'],
            'start' => $row['start'],
            'end' => $row['end'],
        );
    } else {
        $result = '0';
    }
    echo json_encode($result);
}

function getObat()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT * FROM obat_detail
                                JOIN fase_detail ON obat_detail.id_fase_detail = fase_detail.id_fase_detail
                                JOIN jenis_obat_detail ON obat_detail.id_jenis_obat_detail = jenis_obat_detail.id_jenis_obat_detail
                                WHERE obat_detail.id_fase_detail = '1'
                        ");

    while ($row = mysqli_fetch_array($sql)) {
        $result[] = array(
            'id_obat_detail' => $row['id_obat_detail'],
            'id_jenis_obat_detail' => $row['id_jenis_obat_detail'],
            'obat' => $row['obat'],
            'fase' => $row['fase'],
            'jenis_obat' => $row['jenis_obat'],
            'waktu_minum' => $row['waktu_minum'],
        );
    };
    echo json_encode($result);
}

function submitAlarm()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];
    $status = $obj['status'];
    $hari = $obj['hari'];
    $tgl = $obj['tgl'];
    $fase = $obj['fase'];

    $sql = mysqli_query($conn, "INSERT INTO riwayat (id_user, id_status_detail, hari, tgl, id_fase_detail) 
    VALUES ('$id','$status','$hari','$tgl', '$fase')");

    if ($sql) {
        echo json_encode('1');
    } else {
        echo json_encode('0');
    }
}

function getHari()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT MAX(hari) as hari FROM riwayat 
    WHERE id_user = '$id'
    ORDER BY hari ASC");

    $row = mysqli_fetch_array($sql);

    $hari = $row['hari'];

    if ($hari == null) {
        $sql2 = mysqli_query($conn, "SELECT * FROM alarm 
        WHERE id_user = '$id'");

        $row2 = mysqli_fetch_array($sql2);

        $result = array(
            'msg' => 'alarm',
            'hari' => $row2['hari']
        );
    } else {
        $result = array(
            'msg' => 'riwayat',
            'hari' => $hari
        );
    }

    echo json_encode($result);
}
function getHariAlarm()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT * FROM alarm 
    WHERE id_user = '$id'");

    $row = mysqli_fetch_array($sql);

    $result = array(
        'hari' => $row['hari']
    );

    echo json_encode($result);
}

function getToday()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT * FROM riwayat 
    WHERE id_user = '$id' AND tgl = DATE(NOW())");

    $row = mysqli_fetch_array($sql);

    if ($row > 0) {
        $result = array(
            'id_riwayat' => $row['id_riwayat'],
            'id_user' => $row['id_user'],
            'id_status_detail' => $row['id_status_detail'],
            'hari' => $row['hari'],
            'tgl' => $row['tgl'],
        );
    } else {
        $result = 'null';
    }

    echo json_encode($result);
}

function getRiwayat()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];

    $sql = mysqli_query($conn, "SELECT * FROM riwayat 
    WHERE id_user = '$id' ORDER BY tgl ASC");

    while ($row = mysqli_fetch_array($sql)) {
        $result[] = array(
            'id_riwayat' => $row['id_riwayat'],
            'id_user' => $row['id_user'],
            'id_status_detail' => $row['id_status_detail'],
            'hari' => $row['hari'],
            'tgl' => $row['tgl'],
        );
    }

    $data = $result;
    echo json_encode($data);
}

function selectDate()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];
    $tgl = $obj['tgl'];

    $sql = mysqli_query($conn, "SELECT * FROM riwayat 
    JOIN status_detail ON riwayat.id_status_detail = status_detail.id_status_detail
    JOIN user ON riwayat.id_user = user.id_user
    JOIN kategori_detail ON user.id_kategori_detail = kategori_detail.id_kategori_detail
    JOIN fase_detail ON riwayat.id_fase_detail = fase_detail.id_fase_detail
    WHERE riwayat.id_user = '$id' AND tgl = '$tgl'");

    $row = mysqli_fetch_array($sql);

    if ($row > 0) {
        $result = array(
            'id_riwayat' => $row['id_riwayat'],
            'id_user' => $row['id_user'],
            'id_status_detail' => $row['id_status_detail'],
            'hari' => $row['hari'],
            'tgl' => $row['tgl'],
            'fase' => $row['fase'],
            'kategori' => $row['kategori'],
        );
    } else {
        $result = 'null';
    }

    echo json_encode($result);
}

function getPresentase()
{
    global $conn;
    global $json;
    global $obj;

    $id = $obj['id'];
    $fase = $obj['fase'];

    $sql = mysqli_query($conn, "SELECT COUNT(*) as total FROM riwayat 
                                WHERE id_user = '$id' AND id_fase_detail = '$fase'");

    $row = mysqli_fetch_array($sql);

    $result = array(
        'total' => $row['total']
    );

    echo json_encode($result);
}
