const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'db.json');

const defaultData = () => {
  const salt = bcrypt.genSaltSync(10);
  const passwordHashAdmin = bcrypt.hashSync('admin123', salt);
  const passwordHashTeacher = bcrypt.hashSync('teacher123', salt);
  const passwordHashStudent = bcrypt.hashSync('student123', salt);

  return {
    users: [
      {
            "id": "u-admin",
            "username": "admin",
            "password_hash": "$2a$10$kMoKs6ivi2HCOh5LkJmAWuJEMH/op7EHQKVy9BYRO8FIMjPqY1pyG",
            "full_name": "ผู้ดูแลระบบ (Admin CS-M4)",
            "role": "admin",
            "avatar": "https://api.dicebear.com/7.x/bottts/svg?seed=admin",
            "created_at": "2026-09-18T06:09:45.042Z"
      },
      {
            "id": "u-teacher",
            "username": "teacher",
            "password_hash": "$2a$10$tt3AEdhMKwXSwwZcszqAzujiRxefvKG7PUzzZszZ2yVNmv1y8k9Q2",
            "full_name": "ครูปณิฏฐา บุญยงค์ (ผู้สอน ม.4)",
            "role": "teacher",
            "avatar": "img/teacher_panittha.jpg",
            "created_at": "2026-09-18T06:09:45.043Z"
      },
      {
            "id": "u-21123",
            "username": "21123",
            "password_hash": "$2a$10$751Q/FEOZukHRPVEQTyNYuHDIJvhawbugoVMrXY7PO5iWwUuqBHpq",
            "full_name": "นายกรรณรักษ์ ทองนุ่ม (ม.4/10)",
            "real_name": "นายกรรณรักษ์ ทองนุ่ม",
            "role": "student",
            "student_id": "21123",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21123",
            "created_at": "2026-10-26T07:19:26.082+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21124",
            "username": "21124",
            "password_hash": "$2a$10$noqhuUW3qbB57ytZ2X75KuAObsaufyp/EXjKah5PE/gghrCZqIj0S",
            "full_name": "นายจิตบุณย์ ปราณีตพลกรัง (ม.4/10)",
            "real_name": "นายจิตบุณย์ ปราณีตพลกรัง",
            "role": "student",
            "student_id": "21124",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21124",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21127",
            "username": "21127",
            "password_hash": "$2a$10$m4uLNhMElfAtcpkEymaOTOcVAZVrPNHCtRyMAWBP6tNYyDbalp4F.",
            "full_name": "นายณัฐวุฒิ ชัยศรี (ม.4/10)",
            "real_name": "นายณัฐวุฒิ ชัยศรี",
            "role": "student",
            "student_id": "21127",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21127",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21130",
            "username": "21130",
            "password_hash": "$2a$10$mdVFWdim2uJvMIqYN21UMODJeLMs5y4lBY99.pfLyWiCheTBM0.ei",
            "full_name": "เด็กชายธนภัทร สิทธิเสนา (ม.4/10)",
            "real_name": "เด็กชายธนภัทร สิทธิเสนา",
            "role": "student",
            "student_id": "21130",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21130",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21134",
            "username": "21134",
            "password_hash": "$2a$10$D5krDMlfEdX5WabPKTbIR.H.G36w2LQvFlYmnS8jXgy76.UM0SUYO",
            "full_name": "นายปุณวิทย์ สายมิ่ง (ม.4/10)",
            "real_name": "นายปุณวิทย์ สายมิ่ง",
            "role": "student",
            "student_id": "21134",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21134",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21135",
            "username": "21135",
            "password_hash": "$2a$10$n0dGjOv0av80E/HrL7aj2uWiHOftGi8QhMa6zEa8VoKtmRROvpi/a",
            "full_name": "นายภาสกร ตันเจริญ (ม.4/10)",
            "real_name": "นายภาสกร ตันเจริญ",
            "role": "student",
            "student_id": "21135",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21135",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21137",
            "username": "21137",
            "password_hash": "$2a$10$TJM2mPe96EDs7oGgkuv8nuLJEvW.n3CR0gSsrmqAchbOwHlTuzSUW",
            "full_name": "นายรณกร นาเทเวท (ม.4/10)",
            "real_name": "นายรณกร นาเทเวท",
            "role": "student",
            "student_id": "21137",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21137",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21138",
            "username": "21138",
            "password_hash": "$2a$10$2dhULAoh.2.PqAm6KLienOzdBOYj3hU2IZr3CtdJlBiyLBNWr/Az2",
            "full_name": "นายรพีพัฒน์ บรรดาศักดิ์ (ม.4/10)",
            "real_name": "นายรพีพัฒน์ บรรดาศักดิ์",
            "role": "student",
            "student_id": "21138",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21138",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21284",
            "username": "21284",
            "password_hash": "$2a$10$0F594k8Vt/icqMOrCcHQOef.e5m0wS/SWZaidblBBvVviM.8DVFYW",
            "full_name": "นายปิยภัทร ปักรุ่งเรืองกิจ (ม.4/10)",
            "real_name": "นายปิยภัทร ปักรุ่งเรืองกิจ",
            "role": "student",
            "student_id": "21284",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21284",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21348",
            "username": "21348",
            "password_hash": "$2a$10$A8d6v8BdofeBoXMyBVdXb.zjp/uaux.tPLkHi819LR3kSEUXBHj86",
            "full_name": "นายจตุรเทพ สิทธิสม (ม.4/10)",
            "real_name": "นายจตุรเทพ สิทธิสม",
            "role": "student",
            "student_id": "21348",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21348",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21377",
            "username": "21377",
            "password_hash": "$2a$10$2tdXdKQShC5ZHMU3Y2KZ3.dCDFk.Mv5nx8m1r.pX5XrCSi6Fakpye",
            "full_name": "นายฉัตริน ท่าหิน (ม.4/10)",
            "real_name": "นายฉัตริน ท่าหิน",
            "role": "student",
            "student_id": "21377",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21377",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21411",
            "username": "21411",
            "password_hash": "$2a$10$ZQ0hSrk1NL7M85I.h5ygU.afWEZbcO5Sqog2HuGTy6ztaPsgiBfqO",
            "full_name": "นายพิพัฒน์พงษ์ พงษ์ขจร (ม.4/10)",
            "real_name": "นายพิพัฒน์พงษ์ พงษ์ขจร",
            "role": "student",
            "student_id": "21411",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21411",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21558",
            "username": "21558",
            "password_hash": "$2a$10$DP5JDTR/yP3Y19Fv4L9ZAu0yNJ.xCI774K5v9A6277bjLcVfYC6TG",
            "full_name": "นายธนวินท์ ฝอยหิน (ม.4/10)",
            "real_name": "นายธนวินท์ ฝอยหิน",
            "role": "student",
            "student_id": "21558",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21558",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23551",
            "username": "23551",
            "password_hash": "$2a$10$bHZHyx9XSrz5xalOWNvVFuubp4aoI5HN3SnnEpEsOwRn29B4CGUd2",
            "full_name": "นายธนเดช กรัดคล้ำ (ม.4/10)",
            "real_name": "นายธนเดช กรัดคล้ำ",
            "role": "student",
            "student_id": "23551",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23551",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23552",
            "username": "23552",
            "password_hash": "$2a$10$NguuHNfXEHntMNAgRGsuTOe1xf2xdd/35aDAQpkMdcX7.Q5FZDOTK",
            "full_name": "นายธนวินท์ นาจำรัส (ม.4/10)",
            "real_name": "นายธนวินท์ นาจำรัส",
            "role": "student",
            "student_id": "23552",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23552",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23553",
            "username": "23553",
            "password_hash": "$2a$10$10vJON3YwOF.J/4.YZq2y.MD5Z8W6KkXAI2LGZLRv.A/r6AxT56va",
            "full_name": "เด็กชายภวัต สุขสีดา (ม.4/10)",
            "real_name": "เด็กชายภวัต สุขสีดา",
            "role": "student",
            "student_id": "23553",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23553",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23554",
            "username": "23554",
            "password_hash": "$2a$10$3.f.6iRcaj2bcR9Kuad2JO1345NPu/6Ao8oRwcvTehTD1.EM3RtsK",
            "full_name": "เด็กชายศุภกรณ์ ราชสีหสุข (ม.4/10)",
            "real_name": "เด็กชายศุภกรณ์ ราชสีหสุข",
            "role": "student",
            "student_id": "23554",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23554",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21101",
            "username": "21101",
            "password_hash": "$2a$10$qgr0M5JE070PgF4ICEHBpeb6kYL6Hfp7GX50qbggGkzje4Cnt0S9e",
            "full_name": "เด็กหญิงณภัทรา โยธา (ม.4/10)",
            "real_name": "เด็กหญิงณภัทรา โยธา",
            "role": "student",
            "student_id": "21101",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21101",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21147",
            "username": "21147",
            "password_hash": "$2a$10$kXyMF.lr48fjHlMehTOAF.etjKf21Vw.A/0dy5HB/yn7b4PWoMy8y",
            "full_name": "เด็กหญิงปัญญพัชญ์ แก้วพลงาม (ม.4/10)",
            "real_name": "เด็กหญิงปัญญพัชญ์ แก้วพลงาม",
            "role": "student",
            "student_id": "21147",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21147",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21149",
            "username": "21149",
            "password_hash": "$2a$10$sulMHjO2e77yiXrH2n1ONOwPwZYFl2uMhGxywAQ90DtuswdilwhdG",
            "full_name": "นางสาวปิยธิดา เสียงห้วยไพร (ม.4/10)",
            "real_name": "นางสาวปิยธิดา เสียงห้วยไพร",
            "role": "student",
            "student_id": "21149",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21149",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21150",
            "username": "21150",
            "password_hash": "$2a$10$Dn4Pi8jbWamvRPXn8S0Z7OiZYeb0eU5Q0kwoKzKr7/R8ohAmxI8Kq",
            "full_name": "นางสาวพลอยชมพู แพนชัยภูมิ (ม.4/10)",
            "real_name": "นางสาวพลอยชมพู แพนชัยภูมิ",
            "role": "student",
            "student_id": "21150",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21150",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21154",
            "username": "21154",
            "password_hash": "$2a$10$yGIV5B2hB/VPk2KadB4aduoIYGwAIa0FeC0qRAEjrq7/pf9NRVonm",
            "full_name": "นางสาวรัฐภรณ์ วิศาลชัยรัตน์ (ม.4/10)",
            "real_name": "นางสาวรัฐภรณ์ วิศาลชัยรัตน์",
            "role": "student",
            "student_id": "21154",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21154",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21156",
            "username": "21156",
            "password_hash": "$2a$10$f6oe6Tc/6NZDfnBYXG/9fO9X3r0RyIftC5GmpVpdulxQvhuuSSuwm",
            "full_name": "เด็กหญิงวิมลสิริ พุฒตาลดง (ม.4/10)",
            "real_name": "เด็กหญิงวิมลสิริ พุฒตาลดง",
            "role": "student",
            "student_id": "21156",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21156",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21157",
            "username": "21157",
            "password_hash": "$2a$10$a.EANpLPsRTleEIW1yVmPOLjvga2LnSTEp/MYeqS7GRxpUDhZgorW",
            "full_name": "นางสาวสมฤดี แสนคำ (ม.4/10)",
            "real_name": "นางสาวสมฤดี แสนคำ",
            "role": "student",
            "student_id": "21157",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21157",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21160",
            "username": "21160",
            "password_hash": "$2a$10$RYX.axggffptdr7CZ.1p1euQmH6J7g12dd5x92pw3OuqIl68mo9a2",
            "full_name": "เด็กหญิงสุรภา เทียนเเดง (ม.4/10)",
            "real_name": "เด็กหญิงสุรภา เทียนเเดง",
            "role": "student",
            "student_id": "21160",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21160",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21161",
            "username": "21161",
            "password_hash": "$2a$10$skSZYEOUHCZbdgV2GJUc4.O.fEcLwV/xxhcDSrk3JBVLYA8lqTaWK",
            "full_name": "เด็กหญิงอิงลดา จันทะเขต (ม.4/10)",
            "real_name": "เด็กหญิงอิงลดา จันทะเขต",
            "role": "student",
            "student_id": "21161",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21161",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21187",
            "username": "21187",
            "password_hash": "$2a$10$1G7.cSokTC/AsOlhOUDlDOPEQkqh73.vkxwVYUZJXEbCHf6z8c3dq",
            "full_name": "นางสาวณัฐชยา ไผ่แสวง (ม.4/10)",
            "real_name": "นางสาวณัฐชยา ไผ่แสวง",
            "role": "student",
            "student_id": "21187",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21187",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21374",
            "username": "21374",
            "password_hash": "$2a$10$d7nOn6SsCI7Nbz7bmcOt0eWvv2AdprnolrZbki7xdJlxo.tme8m.e",
            "full_name": "เด็กหญิงอันนา คำแก้ว (ม.4/10)",
            "real_name": "เด็กหญิงอันนา คำแก้ว",
            "role": "student",
            "student_id": "21374",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21374",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21388",
            "username": "21388",
            "password_hash": "$2a$10$nBrS1e.r3/.A5JDHeQ0VTe04YXXsS8GBI6rePUonYvK./M1TFIjna",
            "full_name": "เด็กหญิงกฤติมา มะขามเทศ (ม.4/10)",
            "real_name": "เด็กหญิงกฤติมา มะขามเทศ",
            "role": "student",
            "student_id": "21388",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21388",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21393",
            "username": "21393",
            "password_hash": "$2a$10$qp6akDadPl1gj0QidSC03uJ7reArjYKU67faDz/sYYAFWKyR7ciDS",
            "full_name": "นางสาวทิพวัลย์ ทาสะโก (ม.4/10)",
            "real_name": "นางสาวทิพวัลย์ ทาสะโก",
            "role": "student",
            "student_id": "21393",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21393",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21403",
            "username": "21403",
            "password_hash": "$2a$10$eOt93KtTBzSurQDLDApma.jRAv2naCPBTadF.hK9H/6bg53gO.PTO",
            "full_name": "เด็กหญิงรดากร มีสวรรค์ (ม.4/10)",
            "real_name": "เด็กหญิงรดากร มีสวรรค์",
            "role": "student",
            "student_id": "21403",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21403",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21422",
            "username": "21422",
            "password_hash": "$2a$10$U7SU.kFO42Iawf3ZiVJaeelagIgN0oa/MQft/Ng0hX.WbvptJz/ru",
            "full_name": "นางสาวกฤษศินี มณโฑ (ม.4/10)",
            "real_name": "นางสาวกฤษศินี มณโฑ",
            "role": "student",
            "student_id": "21422",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21422",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21431",
            "username": "21431",
            "password_hash": "$2a$10$O5VWwK1v6KYCQroRaI5efuU2AwWocpIAVH.TuJeOcK.ZkzAyc19vq",
            "full_name": "นางสาวทองนภา บุญอินทร์ (ม.4/10)",
            "real_name": "นางสาวทองนภา บุญอินทร์",
            "role": "student",
            "student_id": "21431",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21431",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21437",
            "username": "21437",
            "password_hash": "$2a$10$tcDB8EgJrW0QhPss8ZFFFu8.ddQtaS0faTakV5h5pfyTC0HEaOffu",
            "full_name": "นางสาวบุศราคัมภ์ ถาวรณ์ (ม.4/10)",
            "real_name": "นางสาวบุศราคัมภ์ ถาวรณ์",
            "role": "student",
            "student_id": "21437",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21437",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21445",
            "username": "21445",
            "password_hash": "$2a$10$hKf709OyO/vaCUqoHJodUecx6Kk5c3Mf79/mevP4TUkLGtRbv4156",
            "full_name": "นางสาวสุทธิฉันท์ สมจิตร์ (ม.4/10)",
            "real_name": "นางสาวสุทธิฉันท์ สมจิตร์",
            "role": "student",
            "student_id": "21445",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21445",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23555",
            "username": "23555",
            "password_hash": "$2a$10$qfKME4KNEq/ZeDm4BarPI.pW/MZDXouFjnmRNG41Pm20ceNVPEGve",
            "full_name": "นางสาวกัญญาภัค ปาราชิตัง (ม.4/10)",
            "real_name": "นางสาวกัญญาภัค ปาราชิตัง",
            "role": "student",
            "student_id": "23555",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23555",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23556",
            "username": "23556",
            "password_hash": "$2a$10$HRp2n/i9cEz65KbIkHhf2uL7I2rPKF80Vvh7e6wTSG6HHlRhv/r5W",
            "full_name": "นางสาวตติยา พรมณี (ม.4/10)",
            "real_name": "นางสาวตติยา พรมณี",
            "role": "student",
            "student_id": "23556",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23556",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23557",
            "username": "23557",
            "password_hash": "$2a$10$t08vW9Zn2e1LO5S2pu7MseodamvMf.CbiK7tSuxXR263Dy26aYmDO",
            "full_name": "นางสาวธนัชพร เนืองนอง (ม.4/10)",
            "real_name": "นางสาวธนัชพร เนืองนอง",
            "role": "student",
            "student_id": "23557",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23557",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23558",
            "username": "23558",
            "password_hash": "$2a$10$/hzk6ys/pq8jDPmC4hUAW.HEE62u4bkiOTvHZMzzMd5MSI/G0AEiG",
            "full_name": "เด็กหญิงลัทวรรณ โพธิ์งาม (ม.4/10)",
            "real_name": "เด็กหญิงลัทวรรณ โพธิ์งาม",
            "role": "student",
            "student_id": "23558",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23558",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-23559",
            "username": "23559",
            "password_hash": "$2a$10$B.TfPrRxArlitYwp.b8rhOGA1Xntqt3rwvxY550TWyEZf3d6pf2um",
            "full_name": "นางสาวสรัญญา ดวงแข (ม.4/10)",
            "real_name": "นางสาวสรัญญา ดวงแข",
            "role": "student",
            "student_id": "23559",
            "class_room": "ม.4/10",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23559",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.277688+00:00"
      },
      {
            "id": "u-21133",
            "username": "21133",
            "password_hash": "$2a$10$nU88mAf7YEpNg1fSQ.a8juGcOa22tRiX7NdA1hW0q.29i.gYY7Pji",
            "full_name": "นายปรีติ ดอกมะขาม (ม.4/12)",
            "real_name": "นายปรีติ ดอกมะขาม",
            "role": "student",
            "student_id": "21133",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21133",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21139",
            "username": "21139",
            "password_hash": "$2a$10$igWYFjWWe.mtqeQELgDa6.qdN8LVF7PHKB7n/APA/ffRFBHWq1E1a",
            "full_name": "นายวัชรพล ชมประไพ (ม.4/12)",
            "real_name": "นายวัชรพล ชมประไพ",
            "role": "student",
            "student_id": "21139",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21139",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21209",
            "username": "21209",
            "password_hash": "$2a$10$jFZxO8mzH9jq689Y8ipnG.t5QvR3JFrK5cpVF2unZbCZn.CjaiVuC",
            "full_name": "นายเชาว์วรรธน์ สงวนศรี (ม.4/12)",
            "real_name": "นายเชาว์วรรธน์ สงวนศรี",
            "role": "student",
            "student_id": "21209",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21209",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21276",
            "username": "21276",
            "password_hash": "$2a$10$dGP09n7EY/PTQyPOwoIrdevOqs9OsE.SYsoksN30SIbyC0pNp0Js.",
            "full_name": "นายชัยธวัช สำเนียงเพราะ (ม.4/12)",
            "real_name": "นายชัยธวัช สำเนียงเพราะ",
            "role": "student",
            "student_id": "21276",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21276",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21351",
            "username": "21351",
            "password_hash": "$2a$10$gQq7CSRQy0ByfPk1F5i73OwMhuy5pjgWBMNz5X6iWzQuQcb8P5Fsy",
            "full_name": "นายธีระวัฒน์ ชื่นตา (ม.4/12)",
            "real_name": "นายธีระวัฒน์ ชื่นตา",
            "role": "student",
            "student_id": "21351",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21351",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21353",
            "username": "21353",
            "password_hash": "$2a$10$zAfeh..2NQRkGwLov3ggLeHjuNWGnQho71HM2ClRjWHD0Z.ayEcFe",
            "full_name": "นายนิธิภัทร์ อัตตโชติโภคิน (ม.4/12)",
            "real_name": "นายนิธิภัทร์ อัตตโชติโภคิน",
            "role": "student",
            "student_id": "21353",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21353",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21354",
            "username": "21354",
            "password_hash": "$2a$10$sfS0Mzq5.ZVHUJd6KoLjze7XxHtSLjGzAl6M1UXqEuAbY2ZDNgHI.",
            "full_name": "นายพีรณัฐ เทียมศิริ (ม.4/12)",
            "real_name": "นายพีรณัฐ เทียมศิริ",
            "role": "student",
            "student_id": "21354",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21354",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21355",
            "username": "21355",
            "password_hash": "$2a$10$cP6CCo3hsMIhy0fR2LN.WO25BnE2.NtWocT4M2F0gcKSZrWpN9jDG",
            "full_name": "นายภูมิพัฒน์ งามมีศรี (ม.4/12)",
            "real_name": "นายภูมิพัฒน์ งามมีศรี",
            "role": "student",
            "student_id": "21355",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21355",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21357",
            "username": "21357",
            "password_hash": "$2a$10$e7.5NDykf2H8O7mk61K09e1wovLv4v.aOQ9o/aiYZAGjbv2WcQrBa",
            "full_name": "นายหฤษฏ จันทร์มงคล (ม.4/12)",
            "real_name": "นายหฤษฏ จันทร์มงคล",
            "role": "student",
            "student_id": "21357",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21357",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21383",
            "username": "21383",
            "password_hash": "$2a$10$4d8edbL0dtziV2.S9eZbVu2/1jNI6S88kZTg6z7tF0ddmYeX1Be36",
            "full_name": "นายภูริชญา พิมพาแป้น (ม.4/12)",
            "real_name": "นายภูริชญา พิมพาแป้น",
            "role": "student",
            "student_id": "21383",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21383",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21412",
            "username": "21412",
            "password_hash": "$2a$10$RS85B/wZf6Sjz9M5jmX.SemEf8kbm2CUmeZKWNbOYb6Tb1/oPqsIe",
            "full_name": "นายภาณุศิษฏ์ คำไขสอน (ม.4/12)",
            "real_name": "นายภาณุศิษฏ์ คำไขสอน",
            "role": "student",
            "student_id": "21412",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21412",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-23567",
            "username": "23567",
            "password_hash": "$2a$10$KERSi/dPHxD66mCQkupwM.q7xHnWUVXoUSLyMx/hkyuzBrecW/OAO",
            "full_name": "นายกันณภัทร ศรีอัสดร (ม.4/12)",
            "real_name": "นายกันณภัทร ศรีอัสดร",
            "role": "student",
            "student_id": "23567",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23567",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-23568",
            "username": "23568",
            "password_hash": "$2a$10$l8hdQ4MaxpEQFeWmjeM/FuFq7hMiGIBl6w6CVKKi1dhg0jZnipc/6",
            "full_name": "นายณัฐกรณ์ พรมวงศ์ (ม.4/12)",
            "real_name": "นายณัฐกรณ์ พรมวงศ์",
            "role": "student",
            "student_id": "23568",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23568",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-23569",
            "username": "23569",
            "password_hash": "$2a$10$i1qh5rOlwfRt9iwWhe/TM.PgXRI9IyMQlkm/ZqqOjj0ySajZGVo3q",
            "full_name": "นายธรรมพน แสงสุรเดช (ม.4/12)",
            "real_name": "นายธรรมพน แสงสุรเดช",
            "role": "student",
            "student_id": "23569",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23569",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-23570",
            "username": "23570",
            "password_hash": "$2a$10$1CKfbNE/f6prHHQO563PeeLnKffhoJjrrOlbMjerZhi.zDKm2BBaq",
            "full_name": "นายธีร์ธดา จึงตระกูล (ม.4/12)",
            "real_name": "นายธีร์ธดา จึงตระกูล",
            "role": "student",
            "student_id": "23570",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23570",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21071",
            "username": "21071",
            "password_hash": "$2a$10$6NtV57TtfmFNAx7rQ.ypK.c5ZO3AF90gQVYGdo62xML31LTzKuNv.",
            "full_name": "นางสาวณัฐกานต์ กาพล (ม.4/12)",
            "real_name": "นางสาวณัฐกานต์ กาพล",
            "role": "student",
            "student_id": "21071",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21071",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21116",
            "username": "21116",
            "password_hash": "$2a$10$m47Zj5OHB51tF8tGh.ukpOBhHe0mjUhBbkRv6XFeHTOZRqQSH55oW",
            "full_name": "นางสาวลลิตา เคนทะภักดิ์ (ม.4/12)",
            "real_name": "นางสาวลลิตา เคนทะภักดิ์",
            "role": "student",
            "student_id": "21116",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21116",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21118",
            "username": "21118",
            "password_hash": "$2a$10$DQfkB26wk0pqkAtyaN6uSu8fuYxm0Ulm9Wpo9L0/DjmJuxakzTVo2",
            "full_name": "นางสาวศิริพรรณ โยคะสิงห์ (ม.4/12)",
            "real_name": "นางสาวศิริพรรณ โยคะสิงห์",
            "role": "student",
            "student_id": "21118",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21118",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21122",
            "username": "21122",
            "password_hash": "$2a$10$krhv2MpwAK0mTXSZeQup8O2ViAix3lHd/lxbrmuwAGwY1OMoKkNdm",
            "full_name": "นางสาวอาทิตยา คำมุง (ม.4/12)",
            "real_name": "นางสาวอาทิตยา คำมุง",
            "role": "student",
            "student_id": "21122",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21122",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21148",
            "username": "21148",
            "password_hash": "$2a$10$5ZwMdyw.WnAQHETGSA0RlOlzHogMFB9gOhCMZIx3UwINYdumeem4q",
            "full_name": "นางสาวปาณิสรา พลรัตน์ (ม.4/12)",
            "real_name": "นางสาวปาณิสรา พลรัตน์",
            "role": "student",
            "student_id": "21148",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21148",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21293",
            "username": "21293",
            "password_hash": "$2a$10$ESN5OhFyGRt1kuOpS8ECPe2inf/.5EOh2aGYl1CMcjyXVCpZjXPZC",
            "full_name": "นางสาวกนกวรรณ กวยเหม (ม.4/12)",
            "real_name": "นางสาวกนกวรรณ กวยเหม",
            "role": "student",
            "student_id": "21293",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21293",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21361",
            "username": "21361",
            "password_hash": "$2a$10$rC8JeIrVo7IPcJ17gu.hg.dPYkWhxLGrY4TfcfsOR5rPSdbQB2Fm2",
            "full_name": "นางสาวนลินนิภา จันทรักษ์ (ม.4/12)",
            "real_name": "นางสาวนลินนิภา จันทรักษ์",
            "role": "student",
            "student_id": "21361",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21361",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21364",
            "username": "21364",
            "password_hash": "$2a$10$L4iFT4XDIc6DLpPwyUd13uxlS9OL9/vJx/WTRwd99GUa2qKjl4vuK",
            "full_name": "นางสาวปาณิสรา จันทนา (ม.4/12)",
            "real_name": "นางสาวปาณิสรา จันทนา",
            "role": "student",
            "student_id": "21364",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21364",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21367",
            "username": "21367",
            "password_hash": "$2a$10$qxYCVzdGtW/QIeeWR23LjucvAlFEA3oRjt6Hy.W007i10NKxRhLJO",
            "full_name": "นางสาวพิชญา เกรียงศักดิ์ (ม.4/12)",
            "real_name": "นางสาวพิชญา เกรียงศักดิ์",
            "role": "student",
            "student_id": "21367",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21367",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21369",
            "username": "21369",
            "password_hash": "$2a$10$dJzn0h/JwgtZLjRpm5UJIu4s93WIH5oy9vHqwobnmnoRTCuuHSgbG",
            "full_name": "นางสาววาดวรารัตน์ กันธุ (ม.4/12)",
            "real_name": "นางสาววาดวรารัตน์ กันธุ",
            "role": "student",
            "student_id": "21369",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21369",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21373",
            "username": "21373",
            "password_hash": "$2a$10$trOenhZmaJOFVmsDbQLAPeJYjLVt8tiQ2kbJdIeoTPUwxppV4e2jy",
            "full_name": "นางสาวอรพิชา โฉมฉาย (ม.4/12)",
            "real_name": "นางสาวอรพิชา โฉมฉาย",
            "role": "student",
            "student_id": "21373",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21373",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21375",
            "username": "21375",
            "password_hash": "$2a$10$Z3VNb7K4J8N3T1yT1jeJUuJ22Rx0xdkU6JwMdXxXqDrv2h/Me/gTy",
            "full_name": "นางสาวอัยรฎา สมอุ่มจาน (ม.4/12)",
            "real_name": "นางสาวอัยรฎา สมอุ่มจาน",
            "role": "student",
            "student_id": "21375",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21375",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21434",
            "username": "21434",
            "password_hash": "$2a$10$4nAdwloMCbeBJIbGY3Vq..t6FWNeVbbLDCSEslw9ANGFcjTFnqnV2",
            "full_name": "นางสาวธาวินี ปานสังข์ (ม.4/12)",
            "real_name": "นางสาวธาวินี ปานสังข์",
            "role": "student",
            "student_id": "21434",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21434",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21442",
            "username": "21442",
            "password_hash": "$2a$10$xhsnHQDZ3PUXvjgOZNtR9e27v0VGVtwXM/0wH7EGk7BsiIdxl8OMy",
            "full_name": "นางสาววรดา พลฤทธิ์ (ม.4/12)",
            "real_name": "นางสาววรดา พลฤทธิ์",
            "role": "student",
            "student_id": "21442",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21442",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-23571",
            "username": "23571",
            "password_hash": "$2a$10$6U.2cdLShJhYP2P03c/.R.LJYjy6FH11nB3AQsni59Yi7VnBIXv1G",
            "full_name": "นางสาวจันทรัสม์ บุญศรี (ม.4/12)",
            "real_name": "นางสาวจันทรัสม์ บุญศรี",
            "role": "student",
            "student_id": "23571",
            "class_room": "ม.4/12",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23571",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21347",
            "username": "21347",
            "password_hash": "$2a$10$5sKeT7v6UMDDr6D6F4bMmequEsfWQlvcEtyKns./oMu7RBsjMhiIK",
            "full_name": "นายโฆกษิพัฒณ์ เกิดเจริญ (ม.4/9)",
            "real_name": "นายโฆกษิพัฒณ์ เกิดเจริญ",
            "role": "student",
            "student_id": "21347",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21347",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21349",
            "username": "21349",
            "password_hash": "$2a$10$53EFlp.5QlY8piiS8v./a.iBoagbqAq.G4jNaYrKhLOU81GMuuZjm",
            "full_name": "นายจิรพัส สำราญจิตต์ (ม.4/9)",
            "real_name": "นายจิรพัส สำราญจิตต์",
            "role": "student",
            "student_id": "21349",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21349",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21352",
            "username": "21352",
            "password_hash": "$2a$10$32ETwkpMItf.ugHmHNHro.NmZlX5V.ZXJ3K6JwTKWjmYusB5sx8SC",
            "full_name": "นายนิติธร อัศวอักษร (ม.4/9)",
            "real_name": "นายนิติธร อัศวอักษร",
            "role": "student",
            "student_id": "21352",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21352",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21376",
            "username": "21376",
            "password_hash": "$2a$10$JD0UUGXXdirXXkelVspyI.KAwUzouic5gviUCa8cwFr2RU4e0TWlG",
            "full_name": "นายกัญณพัตศ์ วงษ์ชมภู (ม.4/9)",
            "real_name": "นายกัญณพัตศ์ วงษ์ชมภู",
            "role": "student",
            "student_id": "21376",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21376",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21378",
            "username": "21378",
            "password_hash": "$2a$10$TFIUUnpKwD3tddpcoNXghurf.bh4BXlTCsOb4NTNE/Qv7QUHPOQfW",
            "full_name": "นายชนนน สายสุทธิ (ม.4/9)",
            "real_name": "นายชนนน สายสุทธิ",
            "role": "student",
            "student_id": "21378",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21378",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21379",
            "username": "21379",
            "password_hash": "$2a$10$Zf21teHsOWkeXfvlXIgZGOagUEsFYHGRdvSoMMbthmNlda8tB0Uhe",
            "full_name": "นายชนาเมธ เจริญทัศน์ (ม.4/9)",
            "real_name": "นายชนาเมธ เจริญทัศน์",
            "role": "student",
            "student_id": "21379",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21379",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21381",
            "username": "21381",
            "password_hash": "$2a$10$xi1bWvDM8c4ZAldYL1FGdOcb0wntaSaRc9XExE1O5D4YuasQgQItO",
            "full_name": "นายธรรศกร รุ่งรัตนพงศ์ศร (ม.4/9)",
            "real_name": "นายธรรศกร รุ่งรัตนพงศ์ศร",
            "role": "student",
            "student_id": "21381",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21381",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21382",
            "username": "21382",
            "password_hash": "$2a$10$rsu5p3IcNNWeBDxoffINROfhmSCVhHubRurHUUzcjlrDOmduv6zBa",
            "full_name": "นายภคพล พรหมแพทย์ (ม.4/9)",
            "real_name": "นายภคพล พรหมแพทย์",
            "role": "student",
            "student_id": "21382",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21382",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21385",
            "username": "21385",
            "password_hash": "$2a$10$b3AipCVRYaRgOgVSKBLa9OV21tncuUFrtGRF4xdU1DFZT/yJdce8W",
            "full_name": "นายศิวกร จงรักกลาง (ม.4/9)",
            "real_name": "นายศิวกร จงรักกลาง",
            "role": "student",
            "student_id": "21385",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21385",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:18.996857+00:00"
      },
      {
            "id": "u-21418",
            "username": "21418",
            "password_hash": "$2a$10$0w0/ohfEoECPhQeClBKZEeSFExZbBoiCduRE/nCAcnT59qOSA4yJS",
            "full_name": "นายอคิราภ์ น้อยบัวทิพย์ (ม.4/9)",
            "real_name": "นายอคิราภ์ น้อยบัวทิพย์",
            "role": "student",
            "student_id": "21418",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21418",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21144",
            "username": "21144",
            "password_hash": "$2a$10$bRNyo3uV.rp0SPton2gGSuVDfYL2MJUiKIT8i6sm36y7//A.JurK6",
            "full_name": "นางสาวชุติกาญจน์ เหลืองจันทึก (ม.4/9)",
            "real_name": "นางสาวชุติกาญจน์ เหลืองจันทึก",
            "role": "student",
            "student_id": "21144",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21144",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21151",
            "username": "21151",
            "password_hash": "$2a$10$Ik1eabalYtnA8eSqu0uIPOiARXFUSgHdFwIYWtFvyC4k2lEOiADby",
            "full_name": "นางสาวพิชญา พิบูลย์ (ม.4/9)",
            "real_name": "นางสาวพิชญา พิบูลย์",
            "role": "student",
            "student_id": "21151",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21151",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21158",
            "username": "21158",
            "password_hash": "$2a$10$sLAgoZU6YBAHsVDuLBefN.QRJgpR.0duXAJjsWcU/fTGeF8wMKUHi",
            "full_name": "นางสาวสิปาง สุคนธ์ (ม.4/9)",
            "real_name": "นางสาวสิปาง สุคนธ์",
            "role": "student",
            "student_id": "21158",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21158",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21359",
            "username": "21359",
            "password_hash": "$2a$10$mNLH3LXnEz2nTLJMZMFCmuxmkculkUPttDRBfvWISQLUMw1OCPSsu",
            "full_name": "นางสาวชุติมา เลิศราศรีกุล (ม.4/9)",
            "real_name": "นางสาวชุติมา เลิศราศรีกุล",
            "role": "student",
            "student_id": "21359",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21359",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21365",
            "username": "21365",
            "password_hash": "$2a$10$41FiXPMHJXVJeqoDg3qtOe/gqCTBV0liYZb.4aM9J2aCgmzRaAal.",
            "full_name": "นางสาวเปมิกา ชูวงษ์ (ม.4/9)",
            "real_name": "นางสาวเปมิกา ชูวงษ์",
            "role": "student",
            "student_id": "21365",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21365",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21387",
            "username": "21387",
            "password_hash": "$2a$10$UDwhHfpmAc7YqSWaFZdKc.6ZR31.IzBuIhoY5Ab1U9rL5FsBMgKEe",
            "full_name": "นางสาวกนกนัดดา ฟั่นเฝือ (ม.4/9)",
            "real_name": "นางสาวกนกนัดดา ฟั่นเฝือ",
            "role": "student",
            "student_id": "21387",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21387",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21389",
            "username": "21389",
            "password_hash": "$2a$10$mS/Mxx34YluWpWVKC2rwiu6EoZ/erMsf9UGZA6g2dIbcV/PGV0ZIK",
            "full_name": "นางสาวจินต์จุฑา พงษ์กิ่ง (ม.4/9)",
            "real_name": "นางสาวจินต์จุฑา พงษ์กิ่ง",
            "role": "student",
            "student_id": "21389",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21389",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21390",
            "username": "21390",
            "password_hash": "$2a$10$sA32hMOaQRimtoyNz4RnEOIYTGq8SSqp5cTk.n0.JpT4zeVRM6XP2",
            "full_name": "นางสาวชวิศา มั่นคง (ม.4/9)",
            "real_name": "นางสาวชวิศา มั่นคง",
            "role": "student",
            "student_id": "21390",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21390",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21391",
            "username": "21391",
            "password_hash": "$2a$10$0nVjmxornepwndLFOUX1P.fFGlD1d.za1hFAL/QduVCt8WBg0T4za",
            "full_name": "นางสาวณฐอร นายะพันธ์ (ม.4/9)",
            "real_name": "นางสาวณฐอร นายะพันธ์",
            "role": "student",
            "student_id": "21391",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21391",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21392",
            "username": "21392",
            "password_hash": "$2a$10$JX/q8b7cAh943QOFoSH1K.uyQjo3CBec2Wt6hJLFFzw6DPrz33/UW",
            "full_name": "นางสาวณัฐรดา กาบขุนทด (ม.4/9)",
            "real_name": "นางสาวณัฐรดา กาบขุนทด",
            "role": "student",
            "student_id": "21392",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21392",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21394",
            "username": "21394",
            "password_hash": "$2a$10$c4TCDjPVxOd3DzRrY20Zvu1BkU7WHLFTrKsHY9Q3uLd8XQOk12nSW",
            "full_name": "นางสาวธนพรพรรณ มั่นกำเนิด (ม.4/9)",
            "real_name": "นางสาวธนพรพรรณ มั่นกำเนิด",
            "role": "student",
            "student_id": "21394",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21394",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21397",
            "username": "21397",
            "password_hash": "$2a$10$itwwsxlh7eYuXh9DO1jh3uZcYPvyy4CEzgFO4onGPSzjcDglTtG06",
            "full_name": "นางสาวน้ำฟ้า เผ่นจันทึก (ม.4/9)",
            "real_name": "นางสาวน้ำฟ้า เผ่นจันทึก",
            "role": "student",
            "student_id": "21397",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21397",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21400",
            "username": "21400",
            "password_hash": "$2a$10$m61ooSgFPB2s.vnbrwFV2Ow1nXv/5wmv7A3rIeFmxWaE7oOEu61ym",
            "full_name": "นางสาวพรศิรินทร์ ศรีภา (ม.4/9)",
            "real_name": "นางสาวพรศิรินทร์ ศรีภา",
            "role": "student",
            "student_id": "21400",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21400",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21402",
            "username": "21402",
            "password_hash": "$2a$10$C.II9RFT4pNmkDVdrSbkZ.ZGLrT26pZHS.GGgA13DZnBvb4KVU4hi",
            "full_name": "นางสาวภาสินี ไหลยา (ม.4/9)",
            "real_name": "นางสาวภาสินี ไหลยา",
            "role": "student",
            "student_id": "21402",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21402",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21404",
            "username": "21404",
            "password_hash": "$2a$10$f/bU7kOTXJcPW4F9PXi/WOuoqrk84YhuZbOU1m0BgeruuKDCExu1e",
            "full_name": "นางสาวรวิสรา ฟุ้งจันทึก (ม.4/9)",
            "real_name": "นางสาวรวิสรา ฟุ้งจันทึก",
            "role": "student",
            "student_id": "21404",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21404",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21405",
            "username": "21405",
            "password_hash": "$2a$10$hN6oVmTOtB9EVpb5snEkvedJGa/dTZqGblrCEtF7bqE7TCUohPyci",
            "full_name": "นางสาวศรัณย์ภัทร ลัดลอย (ม.4/9)",
            "real_name": "นางสาวศรัณย์ภัทร ลัดลอย",
            "role": "student",
            "student_id": "21405",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21405",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21420",
            "username": "21420",
            "password_hash": "$2a$10$c3pw5frJ7VCW3gm3bC1t/Ok4aGkOFYm4SAvE8ECIVx5TSw7z0KGK6",
            "full_name": "นางสาวกรวรรณ นรชาญ (ม.4/9)",
            "real_name": "นางสาวกรวรรณ นรชาญ",
            "role": "student",
            "student_id": "21420",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21420",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21429",
            "username": "21429",
            "password_hash": "$2a$10$WemlvLVjAqJwGeebdmj2RuEb3xC3iA.fon/RqYhvjmM8LwspRex/6",
            "full_name": "นางสาวณัฏฐณิชา แก้วมงคล (ม.4/9)",
            "real_name": "นางสาวณัฏฐณิชา แก้วมงคล",
            "role": "student",
            "student_id": "21429",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21429",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21432",
            "username": "21432",
            "password_hash": "$2a$10$xygT4IHkaR9zgd3QsyBMouwX7yBvhPiodlQLH9/RB74Qk5x0bpdT2",
            "full_name": "นางสาวทิพย์ลดา ทองทรัพย์ (ม.4/9)",
            "real_name": "นางสาวทิพย์ลดา ทองทรัพย์",
            "role": "student",
            "student_id": "21432",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21432",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21439",
            "username": "21439",
            "password_hash": "$2a$10$8HhuvgL7hEZEY7eL4WyWZOgil9EVsrra2I.V.5lKyh3FmIHe/MQzy",
            "full_name": "นางสาวปัญจพร ปะเตสัง (ม.4/9)",
            "real_name": "นางสาวปัญจพร ปะเตสัง",
            "role": "student",
            "student_id": "21439",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21439",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21443",
            "username": "21443",
            "password_hash": "$2a$10$I7362qubcpkw/UcJK1soxesUW.yClJRByc0KJkd4bqmF.jTy6JXW6",
            "full_name": "นางสาวสิชา เจษฎาคม (ม.4/9)",
            "real_name": "นางสาวสิชา เจษฎาคม",
            "role": "student",
            "student_id": "21443",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21443",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-21444",
            "username": "21444",
            "password_hash": "$2a$10$mc9KYTKmqHOyXG7AOwmYhuAoqBAToaYNxQS6QNMabMX6Tg01GpdLi",
            "full_name": "นางสาวสุชานันท์ ปองสันเทียะ (ม.4/9)",
            "real_name": "นางสาวสุชานันท์ ปองสันเทียะ",
            "role": "student",
            "student_id": "21444",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21444",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-23548",
            "username": "23548",
            "password_hash": "$2a$10$6VvWKnZBXM6k8QNdLRSq4ejnH3CyVpDtvGrK04dPKNndKZhotUPWe",
            "full_name": "นางสาวกฤติกา กันจันทึก (ม.4/9)",
            "real_name": "นางสาวกฤติกา กันจันทึก",
            "role": "student",
            "student_id": "23548",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23548",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-23549",
            "username": "23549",
            "password_hash": "$2a$10$uvi.P00CIQcn8JpzRAZtx..SYWFOFg0HSmWPc0IjOMauWPMaWHgQC",
            "full_name": "นางสาวธนาภา เลิศสัจจวรากุล (ม.4/9)",
            "real_name": "นางสาวธนาภา เลิศสัจจวรากุล",
            "role": "student",
            "student_id": "23549",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23549",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-23550",
            "username": "23550",
            "password_hash": "$2a$10$DPdMvaR7EebZXkpuvhav8Owdxgp9FwCN.mUa2gBazrBQ10s.HgoBq",
            "full_name": "นางสาวสุชัญญา สำรวมสุข (ม.4/9)",
            "real_name": "นางสาวสุชัญญา สำรวมสุข",
            "role": "student",
            "student_id": "23550",
            "class_room": "ม.4/9",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23550",
            "created_at": "2026-10-26T07:19:26.083+00:00",
            "updated_at": "2026-10-26T07:06:19.529376+00:00"
      },
      {
            "id": "u-20727",
            "username": "20727",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.SoPTUJ8psjhXkgiQk8UtBOTKjELzjv2",
            "full_name": "นายอินทร์ภิลักษณ์ บัวเรียง (ม.4/4)",
            "real_name": "นายอินทร์ภิลักษณ์ บัวเรียง",
            "role": "student",
            "student_id": "20727",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=20727",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21018",
            "username": "21018",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.0MXDlhXBW2e0ghJ..FqhWWwnNJYneDS",
            "full_name": "เด็กชายธนวัฒน์ พิณรัตน์ (ม.4/4)",
            "real_name": "เด็กชายธนวัฒน์ พิณรัตน์",
            "role": "student",
            "student_id": "21018",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21018",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21168",
            "username": "21168",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.RQX3qBmnKk3S.L.R5E9TIc./n1mosF2",
            "full_name": "นายปราโมทย์ ตะกิ่มนอก (ม.4/4)",
            "real_name": "นายปราโมทย์ ตะกิ่มนอก",
            "role": "student",
            "student_id": "21168",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21168",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21413",
            "username": "21413",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.XR7YE65ye9Vsw8TLY/TepWnoZogyBR6",
            "full_name": "เด็กชายภูมาธิน ไพรวงค์ (ม.4/4)",
            "real_name": "เด็กชายภูมาธิน ไพรวงค์",
            "role": "student",
            "student_id": "21413",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21413",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23479",
            "username": "23479",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.5r0PSwpBh4g27kXBTVQrPyzdAZtcQqC",
            "full_name": "เด็กชายเกียรติคุณ ประสิทธิ์นอก (ม.4/4)",
            "real_name": "เด็กชายเกียรติคุณ ประสิทธิ์นอก",
            "role": "student",
            "student_id": "23479",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23479",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23480",
            "username": "23480",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.LGp8U0ykrmyF1Xh7lVldOLUzo6NY6Tq",
            "full_name": "นายณัฐวุฒิ จำปาบุรี (ม.4/4)",
            "real_name": "นายณัฐวุฒิ จำปาบุรี",
            "role": "student",
            "student_id": "23480",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23480",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23481",
            "username": "23481",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.vydr/9fHdC.DS.xv7Zv/ftVlpaA5nj.",
            "full_name": "นายปฐวี แถวโสภา (ม.4/4)",
            "real_name": "นายปฐวี แถวโสภา",
            "role": "student",
            "student_id": "23481",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23481",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23482",
            "username": "23482",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.eFyLsroTiQwORgrFxH.OonglCY3YB1G",
            "full_name": "นายปภังกร ปานสุวรรณ์ (ม.4/4)",
            "real_name": "นายปภังกร ปานสุวรรณ์",
            "role": "student",
            "student_id": "23482",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23482",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23483",
            "username": "23483",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.90PcV4W5E/4w7qVNHB88TJmiVlUBi4u",
            "full_name": "เด็กชายภาณุวัฒน์ แก้วแก่นคูณ (ม.4/4)",
            "real_name": "เด็กชายภาณุวัฒน์ แก้วแก่นคูณ",
            "role": "student",
            "student_id": "23483",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23483",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23484",
            "username": "23484",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.cTR9th3xn39ca6LBeZqdWjIwbZ1KDRS",
            "full_name": "นายภานุวัฒน์ ขันทอง (ม.4/4)",
            "real_name": "นายภานุวัฒน์ ขันทอง",
            "role": "student",
            "student_id": "23484",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23484",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23485",
            "username": "23485",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.IwRtc3lBKkA1lL2uR/QWmrw/6n2Uyo.",
            "full_name": "นายวัชรากร โคตรโนนกอก (ม.4/4)",
            "real_name": "นายวัชรากร โคตรโนนกอก",
            "role": "student",
            "student_id": "23485",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23485",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21003",
            "username": "21003",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.NbgUSUJg7MugACgnouXaq6bKfeR2Gei",
            "full_name": "นางสาววิภาวี เทพบุตร (ม.4/4)",
            "real_name": "นางสาววิภาวี เทพบุตร",
            "role": "student",
            "student_id": "21003",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21003",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21006",
            "username": "21006",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.OtYRt5s8YgVPVAW9E7ICPMmiY9PAxzW",
            "full_name": "เด็กหญิงสิรินทรา ภูจีรัง (ม.4/4)",
            "real_name": "เด็กหญิงสิรินทรา ภูจีรัง",
            "role": "student",
            "student_id": "21006",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21006",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21033",
            "username": "21033",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.ymcT50tKC1rtU7QaqfGne2KSZCSIpu.",
            "full_name": "นางสาวธัญญารัตน์ บุญอินทร์ (ม.4/4)",
            "real_name": "นางสาวธัญญารัตน์ บุญอินทร์",
            "role": "student",
            "student_id": "21033",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21033",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21040",
            "username": "21040",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.h6xKeYS.EBpedkpDsPUGwWrpSXy3J72",
            "full_name": "นางสาวพิยดา ศิลาอุดม (ม.4/4)",
            "real_name": "นางสาวพิยดา ศิลาอุดม",
            "role": "student",
            "student_id": "21040",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21040",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21224",
            "username": "21224",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.IlktOX0NHzAITxTEPP3Pp9bVhjcClDS",
            "full_name": "นางสาวณัฎฐิชา เศรษฐบุตร (ม.4/4)",
            "real_name": "นางสาวณัฎฐิชา เศรษฐบุตร",
            "role": "student",
            "student_id": "21224",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21224",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21427",
            "username": "21427",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.dRiU/u1SSnjQ1j0wyfN8WxMCTnCDjni",
            "full_name": "นางสาวจุติไตรพร กรองสี (ม.4/4)",
            "real_name": "นางสาวจุติไตรพร กรองสี",
            "role": "student",
            "student_id": "21427",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21427",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21428",
            "username": "21428",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.W2vj90BjSQdvMbc7noow0zyZExA6l0C",
            "full_name": "นางสาวชุติมา จันทร์ทา (ม.4/4)",
            "real_name": "นางสาวชุติมา จันทร์ทา",
            "role": "student",
            "student_id": "21428",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21428",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21436",
            "username": "21436",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP..okqSp4QfV//NROK5kKRCILH0VGDMke",
            "full_name": "นางสาวนารีรัตน์ เหตุเกษ (ม.4/4)",
            "real_name": "นางสาวนารีรัตน์ เหตุเกษ",
            "role": "student",
            "student_id": "21436",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21436",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-21438",
            "username": "21438",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.3wCrgqd1HA5D1Ij4omSlTdghgJlj.Ty",
            "full_name": "นางสาวปลื้มฤดี พิทักษ์ (ม.4/4)",
            "real_name": "นางสาวปลื้มฤดี พิทักษ์",
            "role": "student",
            "student_id": "21438",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=21438",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23486",
            "username": "23486",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.dd0Qt.8OV6SppFYRXhqC2BLCCKiPi6G",
            "full_name": "นางสาวกชพร บุสทิพย์ (ม.4/4)",
            "real_name": "นางสาวกชพร บุสทิพย์",
            "role": "student",
            "student_id": "23486",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23486",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23487",
            "username": "23487",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.VcSlEJNgLkjn9/P1Eo39xnbrYkMMMfi",
            "full_name": "นางสาวกวินตรา หวังยศ (ม.4/4)",
            "real_name": "นางสาวกวินตรา หวังยศ",
            "role": "student",
            "student_id": "23487",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23487",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23488",
            "username": "23488",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.vI5jPwTLH/aq1TUcoCjCdzXDLDt1ABO",
            "full_name": "นางสาวขวัญจิรา ไพรัตน์ (ม.4/4)",
            "real_name": "นางสาวขวัญจิรา ไพรัตน์",
            "role": "student",
            "student_id": "23488",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23488",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23489",
            "username": "23489",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.COvI1tHb8/TlP3niv6a40FiT9DDDn3e",
            "full_name": "เด็กหญิงจุฬามณี ม่วงคุ้ม (ม.4/4)",
            "real_name": "เด็กหญิงจุฬามณี ม่วงคุ้ม",
            "role": "student",
            "student_id": "23489",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23489",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23490",
            "username": "23490",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.FGU9jRxTmQhQhl.6u7u.FcX6vnIy2qu",
            "full_name": "นางสาวฐิตาภา จู (ม.4/4)",
            "real_name": "นางสาวฐิตาภา จู",
            "role": "student",
            "student_id": "23490",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23490",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23491",
            "username": "23491",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.rwDYC3EgkAsadt.gCvRhr4HArDb88ci",
            "full_name": "เด็กหญิงธัญลักษณ์ ไชยสนาม (ม.4/4)",
            "real_name": "เด็กหญิงธัญลักษณ์ ไชยสนาม",
            "role": "student",
            "student_id": "23491",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23491",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23492",
            "username": "23492",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.Egi34em1eV3w4m.FNPcJENh0XPmUAjG",
            "full_name": "เด็กหญิงนันทิชา ประมวล (ม.4/4)",
            "real_name": "เด็กหญิงนันทิชา ประมวล",
            "role": "student",
            "student_id": "23492",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23492",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23493",
            "username": "23493",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.x4pR01Ggn6hQmjXv6pLAVDYihXqMx6y",
            "full_name": "นางสาวปนัดดา ลือปัญญา (ม.4/4)",
            "real_name": "นางสาวปนัดดา ลือปัญญา",
            "role": "student",
            "student_id": "23493",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23493",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23494",
            "username": "23494",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.tSanHqIg4Pel3KjgjAA7cPknLic2tM2",
            "full_name": "เด็กหญิงปรียานุช แดงสวัสดิ์ (ม.4/4)",
            "real_name": "เด็กหญิงปรียานุช แดงสวัสดิ์",
            "role": "student",
            "student_id": "23494",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23494",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23495",
            "username": "23495",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.fDn9JR5YBC4si0Bnpsj43XEUcSSnAou",
            "full_name": "เด็กหญิงปาริตา ป่ากว้าง (ม.4/4)",
            "real_name": "เด็กหญิงปาริตา ป่ากว้าง",
            "role": "student",
            "student_id": "23495",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23495",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23496",
            "username": "23496",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.TRG/oCbyAJ2wtxMq4QzvwxuIa3xauPa",
            "full_name": "นางสาวพิรดา หลอดเข็ม (ม.4/4)",
            "real_name": "นางสาวพิรดา หลอดเข็ม",
            "role": "student",
            "student_id": "23496",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23496",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23497",
            "username": "23497",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP..opWh7cdihAm97AE6Mf5i4BDJlmRgQ.",
            "full_name": "นางสาวมธุริน พุทธโคตร (ม.4/4)",
            "real_name": "นางสาวมธุริน พุทธโคตร",
            "role": "student",
            "student_id": "23497",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23497",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23498",
            "username": "23498",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.HkHOJeVE.icTIWFFml.KZ2sw0CiQiQS",
            "full_name": "เด็กหญิงรัตติกาล ประเสริฐ (ม.4/4)",
            "real_name": "เด็กหญิงรัตติกาล ประเสริฐ",
            "role": "student",
            "student_id": "23498",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23498",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23499",
            "username": "23499",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.IAtW.2td1bis..rlaSc6y9BMzaHYsqm",
            "full_name": "นางสาววชิรญา ดำรงค์สกุลไทย (ม.4/4)",
            "real_name": "นางสาววชิรญา ดำรงค์สกุลไทย",
            "role": "student",
            "student_id": "23499",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23499",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23500",
            "username": "23500",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.GYxsO.5qaltpzkX3Qqvm913doeOa4x6",
            "full_name": "นางสาววนิดา สุวรรณสิงห์ (ม.4/4)",
            "real_name": "นางสาววนิดา สุวรรณสิงห์",
            "role": "student",
            "student_id": "23500",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23500",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23501",
            "username": "23501",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.a7oLFYa6z.p6kcRa1lZ1d1Sd4PKTQ3q",
            "full_name": "เด็กหญิงสิริกุล บุญไสว (ม.4/4)",
            "real_name": "เด็กหญิงสิริกุล บุญไสว",
            "role": "student",
            "student_id": "23501",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23501",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23502",
            "username": "23502",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.cIoG2wzbkMhPlalhnX3wjcwpzH7drAe",
            "full_name": "นางสาวสุทธิดา ป้องประดา (ม.4/4)",
            "real_name": "นางสาวสุทธิดา ป้องประดา",
            "role": "student",
            "student_id": "23502",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23502",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23503",
            "username": "23503",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.AfQ9c62pNn4ATCH1kZMgZq3H0LfeRN2",
            "full_name": "นางสาวสุพัตรา เพชรทิพย์ (ม.4/4)",
            "real_name": "นางสาวสุพัตรา เพชรทิพย์",
            "role": "student",
            "student_id": "23503",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23503",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23504",
            "username": "23504",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.cm.5O2D24.Mly3vSXC7F0yitrD5IVFO",
            "full_name": "นางสาวอภิญญา ทวีสกุลรัตน์ (ม.4/4)",
            "real_name": "นางสาวอภิญญา ทวีสกุลรัตน์",
            "role": "student",
            "student_id": "23504",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23504",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      },
      {
            "id": "u-23505",
            "username": "23505",
            "password_hash": "$2a$10$NiQD96E6/xt4xs/F153wP.5tl5fUrcHnU0Aaq8Sy8i7/CGZeyn9Y.",
            "full_name": "นางสาวอริสรา ตันสุรินทร์ (ม.4/4)",
            "real_name": "นางสาวอริสรา ตันสุรินทร์",
            "role": "student",
            "student_id": "23505",
            "class_room": "ม.4/4",
            "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=23505",
            "created_at": "2026-10-30T06:00:42.436Z",
            "updated_at": "2026-10-30T06:00:42.436Z"
      }
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'หน่วยการเรียนรู้ที่ 1: แนวคิดเชิงคำนวณในการพัฒนาโครงงาน',
        description: 'ศึกษาองค์ประกอบ 4 ส่วนของ Computational Thinking, วงจร SDLC 5 ขั้นตอน และโครงสร้างรายงานโครงงาน 5 บท ตามหลักสูตรแกนกลาง ม.4',
        order: 1,
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
        lessonsCount: 3
      },
      {
        id: 'mod-2',
        title: 'หน่วยการเรียนรู้ที่ 2: การประยุกต์ใช้แนวคิดเชิงคำนวณเพื่อพัฒนาโครงงาน',
        description: 'การศึกษาความเป็นไปได้ ออกแบบผังงาน (Flowchart) แบบจำลองข้อมูล UI/UX ลงมือพัฒนา ทดสอบ และนำเสนอโครงงาน',
        order: 2,
        coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80',
        lessonsCount: 4
      }
    ],

    lessons: [
      {
        id: 'les-101',
        module_id: 'mod-1',
        title: '1.1 องค์ประกอบของแนวคิดเชิงคำนวณ (Computational Thinking)',
        order: 1,
        duration: '45 นาที',
        summary: 'เรียนรู้องค์ประกอบ 4 ส่วน: Decomposition, Pattern Recognition, Abstraction, และ Algorithm Design',
        videoUrl: 'https://www.youtube.com/embed/mUXo-E183Sc',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide1/embed',
        content: `
# 1.1 องค์ประกอบของแนวคิดเชิงคำนวณ (Computational Thinking)

แนวคิดเชิงคำนวณ (Computational Thinking) เป็นกระบวนการวิเคราะห์และแก้ไขปัญหาอย่างเป็นลำดับขั้นตอน เพื่อให้ได้แนวทางแก้ไขที่ทั้งมนุษย์และคอมพิวเตอร์เข้าใจและนำไปปฏิบัติได้จริง ตามตัวชี้วัด ว 4.2 ม.4/1

---

### 🧩 องค์ประกอบหลัก 4 ประการ (Computational Thinking 4 Elements):

#### 1. การแตกย่อยปัญหา (Decomposition)
- การย่อยปัญหาใหญ่หรือระบบที่ซับซ้อนให้ออกเป็นปัญหาย่อยๆ ที่มีขนาดเล็กและจัดการได้ง่ายขึ้น
- *ตัวอย่างในชีวิตจริง:* การพัฒนาแอปพลิเคชันระบบสั่งอาหารในโรงเรียน แยกออกเป็น:
  - ระบบจัดการเมนูและร้านอาหาร
  - ระบบตะกร้าสินค้าและสั่งซื้อ
  - ระบบชำระเงินออนไลน์
  - ระบบคิวรับอาหาร

#### 2. การจดจำรูปแบบ (Pattern Recognition)
- การหาความเหมือน ความคล้ายคลึง หรือแนวโน้มของปัญหาย่อยต่างๆ ที่เคยพบเจอมาก่อน เพื่อนำวิธีการแก้ปัญหาที่เคยใช้ได้ผลมาประยุกต์ใช้
- *ตัวอย่าง:* การพบว่าระบบชำระเงินของแอปต่าง ๆ มักใช้ขั้นตอน Scan PromptPay QR Code เดียวกัน

#### 3. การคิดเชิงนามธรรม (Abstraction)
- การมุ่งเน้นเฉพาะข้อมูลที่สำคัญและจำเป็นต่อการแก้ไขปัญหา โดยตัดรายละเอียดที่ไม่เกี่ยวข้องออกไป
- *ตัวอย่าง:* แผนที่รถไฟฟ้า MRT/BTS เลือกแสดงเฉพาะจุดเชื่อมต่อสถานี โดยตัดภูมิประเทศ อาคาร และสิ่งปลูกสร้างจริงออกไป

#### 4. การออกแบบอัลกอริทึม (Algorithm Design)
- การออกแบบลำดับขั้นตอนคำสั่งเป็นข้อๆ (Step-by-step) ที่ชัดเจน ครอบคลุมทุกเงื่อนไข เพื่อนำไปสู่การแก้ปัญหาที่ถูกต้อง
- *การถ่ายทอดอัลกอริทึม:* สามารถเขียนในรูปแบบข้อความบรรยาย, รหัสลำลอง (Pseudocode) หรือผังงาน (Flowchart)
        `,
        interactiveType: 'decomposition'
      },
      {
        id: 'les-102',
        module_id: 'mod-1',
        title: '1.2 วงจรการพัฒนาระบบสารสนเทศ (SDLC 5 ขั้นตอน)',
        order: 2,
        duration: '50 นาที',
        summary: 'กระบวนการ SDLC 5 ขั้นตอนในการทำโครงงานวิทยาการคำนวณ',
        videoUrl: 'https://www.youtube.com/embed/Fi3_BjVzpqk',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide2/embed',
        content: `
# 1.2 วงจรการพัฒนาระบบสารสนเทศ (Software Development Life Cycle - SDLC)

การทำโครงงานทางเทคโนโลยีสารสนเทศอย่างมีประสิทธิภาพ ต้องดำเนินงานตามวงจร SDLC 5 ขั้นตอนดังนี้:

---

### 🔄 ขั้นตอนทั้ง 5 ของ SDLC:

1. **การวางแผน (Planning)**
   - กำหนดวัตถุประสงค์ ขอบเขต เป้าหมาย ทรัพยากร และระยะเวลาดำเนินงาน (จัดทำ Gantt Chart)
2. **การวิเคราะห์ (Analysis)**
   - รวบรวมความต้องการของผู้ใช้งาน (Requirements) วิเคราะห์ปัญหา และศึกษาความเป็นไปได้
3. **การออกแบบ (Design)**
   - ออกแบบสถาปัตยกรรมระบบ ผังงาน (Flowchart), แบบจำลองข้อมูล (Database Schema) และ UI Mockup
4. **การพัฒนาและติดตั้ง (Implementation & Testing)**
   - เขียนชุดคำสั่ง (Coding) สร้างฐานข้อมูล และทดสอบความถูกต้องของซอฟต์แวร์ (Testing)
5. **การบำรุงรักษา (Maintenance)**
   - คอยดูแล แก้ไขข้อผิดพลาด (Bug Fixes) และปรับปรุงระบบตามข้อเสนอแนะของผู้ใช้
        `,
        interactiveType: 'sdlc'
      },
      {
        id: 'les-103',
        module_id: 'mod-1',
        title: '1.3 โครงสร้างเค้าโครงและรายงานโครงงาน 5 บท',
        order: 3,
        duration: '40 นาที',
        summary: 'รูปแบบการจัดทำรายงานเอกสารโครงงาน 5 บท มาตรฐานวิชาการ',
        videoUrl: 'https://www.youtube.com/embed/2_sample_vid3',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide3/embed',
        content: `
# 1.3 โครงสร้างรายงานโครงงาน 5 บท

เอกสารรายงานโครงงานฉบับสมบูรณ์ประกอบด้วย 3 ส่วนหลัก (ตอนต้น ตอนหลัก และตอนท้าย) โดยส่วนเนื้อหาหลักแบ่งออกเป็น 5 บทดังนี้:

---

- **บทที่ 1 บทนำ**: ความเป็นมา วัตถุประสงค์ ขอบเขตของโครงงาน และประโยชน์ที่คาดว่าจะได้รับ
- **บทที่ 2 เอกสารและทฤษฎีที่เกี่ยวข้อง**: แนวคิดเชิงคำนวณ ภาษาโปรแกรมที่ใช้ เทคโนโลยี และงานวิจัยอ้างอิง
- **บทที่ 3 วิธีดำเนินการทำโครงงาน**: เครื่องมือ ขั้นตอนการพัฒนาตาม SDLC ผังงานระบบ และ Gantt Chart
- **บทที่ 4 ผลการดำเนินงาน**: ภาพหน้าจอชิ้นงาน ผลการทดสอบโปรแกรม และการประเมินประสิทธิภาพ
- **บทที่ 5 สรุปผลและข้อเสนอแนะ**: สรุปผลการพัฒนา อภิปรายผล ปัญหาอุปสรรค และข้อเสนอแนะพัฒนาต่อ
        `,
        interactiveType: 'proposal'
      },
      {
        id: 'les-201',
        module_id: 'mod-2',
        title: '2.1 การระบุปัญหาและศึกษาความเป็นไปได้ (Problem & Feasibility)',
        order: 1,
        duration: '45 นาที',
        summary: 'การคัดเลือกหัวข้อโครงงานที่สนใจและวิเคราะห์ความคุ้มค่าและความเป็นไปได้',
        videoUrl: 'https://www.youtube.com/embed/2_sample_vid4',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide4/embed',
        content: `
# 2.1 การระบุปัญหาและศึกษาความเป็นไปได้

การเริ่มต้นทำโครงงานที่ดีต้องเกิดจากความตระหนักในปัญหาจริงในชีวิตประจำวัน หรือปัญหาในโรงเรียน/ชุมชน

### 🎯 หลักการประเมินความเป็นไปได้ (Feasibility Analysis):
1. **ด้านเทคโนโลยี**: มีซอฟต์แวร์ ฮาร์ดแวร์ หรือเครื่องมือที่เหมาะสมหรือไม่
2. **ด้านทรัพยากรและเวลา**: มีระยะเวลา บุคลากร และงบประมาณเพียงพอหรือไม่
3. **ด้านการนำไปใช้จริง**: ตอบโจทย์ผู้ใช้งานและแก้ปัญหาได้ตรงจุดหรือไม่
        `,
        interactiveType: 'none'
      },
      {
        id: 'les-202',
        module_id: 'mod-2',
        title: '2.2 การออกแบบระบบ ผังงาน (Flowchart) และ UI/UX',
        order: 2,
        duration: '50 นาที',
        summary: 'สัญลักษณ์ผังงานมาตรฐาน และการวางโครงร่างสถาปัตยกรรมหน้าจอ',
        videoUrl: 'https://www.youtube.com/embed/2_sample_vid5',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide5/embed',
        content: `
# 2.2 การออกแบบระบบ ผังงาน (Flowchart) และ UI/UX

ก่อนเขียนโค้ด จำเป็นต้องถ่ายทอดความคิดออกมาเป็นแผนภาพผังงาน (Flowchart) โดยใช้สัญลักษณ์มาตรฐาน:

- **Terminal (วงกลมมน)**: จุดเริ่มต้น / สิ้นสุด
- **Process (สี่เหลี่ยมผืนผ้า)**: การประมวลผล / กำหนดค่า
- **Decision (สี่เหลี่ยมข้าวหลามตัด)**: การตัดสินใจ เงื่อนไข (True/False)
- **Input/Output (สี่เหลี่ยมด้านขนาน)**: รับข้อมูล / แสดงผล
        `,
        interactiveType: 'flowchart'
      },
      {
        id: 'les-203',
        module_id: 'mod-2',
        title: '2.3 การลงมือพัฒนาโครงงานและการทดสอบ (Implementation & Testing)',
        order: 3,
        duration: '60 นาที',
        summary: 'การเขียนโค้ดพัฒนาชิ้นงานและการทดสอบหาข้อผิดพลาด (Testing)',
        videoUrl: 'https://www.youtube.com/embed/2_sample_vid6',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide6/embed',
        content: `
# 2.3 การลงมือพัฒนาโครงงานและการทดสอบ (Implementation & Testing)

ขั้นตอนนี้เป็นการแปลงผังงานและการออกแบบให้กลายเป็นซอฟต์แวร์จริง โดยครอบคลุม:
- การเขียนโปรแกรม (Frontend, Backend, Database)
- การทดสอบฟังก์ชันการทำงาน (Unit Testing, System Testing)
- การแก้ไขข้อผิดพลาด (Debugging)
        `,
        interactiveType: 'none'
      },
      {
        id: 'les-204',
        module_id: 'mod-2',
        title: '2.4 การประเมินผลและการนำเสนอโครงงาน (Evaluation & Presentation)',
        order: 4,
        duration: '45 นาที',
        summary: 'การประเมินคุณภาพชิ้นงาน การจัดทำบอร์ดนำเสนอ และการนำเสนอหน้าชั้นเรียน',
        videoUrl: 'https://www.youtube.com/embed/2_sample_vid7',
        slideUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vQ_sample_slide7/embed',
        content: `
# 2.4 การประเมินผลและการนำเสนอโครงงาน (Evaluation & Presentation)

การนำเสนอโครงงานที่มีประสิทธิภาพประกอบด้วย:
- **การประเมินตนเองและเพื่อน (Peer Review)**
- **การจัดทำสื่อนำเสนอ** (Slide Presentation / Poster / Demo Video)
- **การสรุปประเด็นคุณค่าของโครงงาน (Value Proposition)**
        `,
        interactiveType: 'none'
      }
    ],

    ebooks: [
      {
        id: 'eb-1',
        title: 'คู่มือนักเรียน การพัฒนาโครงงานเทคโนโลยี (วิทยาการคำนวณ) ม.4 ฉบับสมบูรณ์ (16 หน้า)',
        author: 'กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
        totalPages: 16,
        filename: 'textbook_m4.pdf',
        url: 'textbook_m4.pdf',
        type: 'student-pdf',
        chapters: [
          { name: 'หน้าปก & ข้อมูลคู่มือนักเรียน', page: 1, badge: 'หน้าแรก' },
          { name: 'คำนำและคำชี้แจงสำหรับนักเรียน', page: 2, badge: 'คำนำ' },
          { name: 'แผนผังสมรรถนะและแนวทางการเรียนรู้', page: 3, badge: 'คำแนะนำ' },
          { name: 'สารบัญโครงสร้างเนื้อหา', page: 4, badge: 'สารบัญ' },
          { name: 'หน่วยที่ 1: แนวคิดเชิงคำนวณและขั้นตอนวิธี (เรื่องที่ 1)', page: 5, badge: 'เรื่อง 1' },
          { name: 'เรื่องที่ 2: วงจรการพัฒนาระบบและการกำหนดปัญหา (SDLC)', page: 8, badge: 'เรื่อง 2' },
          { name: 'เรื่องที่ 3: การวางแผนและการจัดทำเค้าโครงโครงงาน', page: 10, badge: 'เรื่อง 3' },
          { name: 'หน่วยที่ 2: การออกแบบและพัฒนาโครงงานสารสนเทศ (เรื่องที่ 4)', page: 12, badge: 'เรื่อง 4' },
          { name: 'เรื่องที่ 5: การพัฒนาและการทดสอบระบบ (Testing Hierarchy)', page: 14, badge: 'เรื่อง 5' },
          { name: 'เรื่องที่ 6: กฎหมาย PDPA และจริยธรรมดิจิทัล', page: 15, badge: 'เรื่อง 6' },
          { name: 'ภาคผนวก: เกณฑ์การประเมินโครงงาน (Analytic Rubrics)', page: 16, badge: 'ภาคผนวก' }
        ]
      }
    ],

    assignments: [
  {
    "id": "asg-1",
    "unit": "mod-1",
    "title": "ใบงานที่ 1.1: เรื่อง การประยุกต์ใช้แนวคิดเชิงคำนวณในการแก้ปัญหาบริบทจริง",
    "desc": "วิเคราะห์ปัญหาในชีวิตประจำวัน (กรณีศึกษารถของตะวัน หรือปัญหาของตนเอง) และออกแบบวิธีการแก้ปัญหาตาม 4 องค์ประกอบของแนวคิดเชิงคำนวณ",
    "dueDate": "2026-10-15",
    "maxScore": 10,
    "type": "ใบงาน",
    "rubric": {
      "criteria": [
        {
          "name": "การแยกส่วนประกอบ (Decomposition)",
          "max": 2.5,
          "desc": "จำแนกปัญหาย่อยได้ครบถ้วน ชัดเจน และเป็นอิสระต่อกัน"
        },
        {
          "name": "การหารูปแบบ (Pattern Recognition)",
          "max": 2.5,
          "desc": "ระบุแบบแผนความคล้ายคลึงและจัดลำดับความเร่งด่วนได้สมเหตุสมผล"
        },
        {
          "name": "การคิดเชิงนามธรรม (Abstraction)",
          "max": 2.5,
          "desc": "คัดแยกสาระสำคัญและตัดรายละเอียดที่ไม่เกี่ยวข้องได้อย่างชัดเจน"
        },
        {
          "name": "การออกแบบขั้นตอนวิธี (Algorithm)",
          "max": 2.5,
          "desc": "ออกแบบขั้นตอนวิธีเป็นลำดับ ปฏิบัติได้จริง และมีจุดสิ้นสุด"
        }
      ]
    },
    "description": "การประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณเพื่อแก้ปัญหาในชีวิตประจำวัน",
    "points": 10,
    "due": "2026-10-15"
  },
  {
    "id": "asg-2",
    "unit": "mod-1",
    "title": "ใบงานที่ 1.2: เรื่อง การพัฒนาระบบด้วยวงจร SDLC (กรณีศึกษาร้านเบเกอรี)",
    "desc": "วิเคราะห์และวางแผนพัฒนาระบบร้านเบเกอรี Bakery Delight ตามขั้นตอนของวงจรการพัฒนาระบบ (SDLC 5 ขั้นตอน)",
    "dueDate": "2026-10-30",
    "maxScore": 10,
    "type": "ใบงาน",
    "rubric": {
      "criteria": [
        {
          "name": "การวางแผนระบบ (Planning)",
          "max": 2,
          "desc": "กำหนดเป้าหมาย ขอบเขต และศึกษาความเป็นไปได้ชัดเจน"
        },
        {
          "name": "การวิเคราะห์ระบบ (Analysis)",
          "max": 2,
          "desc": "วิเคราะห์ปัญหาเดิมและกำหนด Functional Requirements ได้ครบถ้วน"
        },
        {
          "name": "การออกแบบระบบ (Design)",
          "max": 2,
          "desc": "ออกแบบ Flowchart สถาปัตยกรรม และ UI Mockup ได้ตามมาตรฐาน"
        },
        {
          "name": "การพัฒนาและทดสอบ (Dev & Test)",
          "max": 2,
          "desc": "กำหนดแนวทางการพัฒนาและแผนทดสอบระบบ 4 ระดับสมบูรณ์"
        },
        {
          "name": "การบำรุงรักษาระบบ (Maintenance)",
          "max": 2,
          "desc": "วางแผนการอบรม การสำรองข้อมูล และการดูแลรักษาระบบต่อเนื่อง"
        }
      ]
    },
    "description": "การประยุกต์ใช้วงจรการพัฒนาระบบ 5 ขั้นตอนเพื่อแก้ปัญหาธุรกิจจริง",
    "points": 10,
    "due": "2026-10-30"
  },
  {
    "id": "asg-3",
    "unit": "mod-1",
    "title": "ใบงานที่ 1.3: เรื่อง การจัดทำเค้าโครงรายงานโครงงาน 5 บท",
    "desc": "จัดทำเค้าโครงโครงงาน (Project Proposal) และโครงสร้างรายงาน 5 บทมาตรฐานวิชาการ",
    "dueDate": "2026-11-15",
    "maxScore": 10,
    "type": "ใบงาน",
    "rubric": {
      "criteria": [
        {
          "name": "ส่วนประกอบตอนต้นและบทคัดย่อ",
          "max": 2,
          "desc": "ระบุองค์ประกอบส่วนนำและเขียนบทคัดย่อได้ถูกต้องตามแบบแผนวิชาการ"
        },
        {
          "name": "ส่วนเนื้อหา บทที่ 1 และ 2",
          "max": 3,
          "desc": "กำหนดที่มา วัตถุประสงค์ ขอบเขต และทฤษฎีอ้างอิงสนับสนุนโครงงานชัดเจน"
        },
        {
          "name": "ส่วนเนื้อหา บทที่ 3, 4 และ 5",
          "max": 3,
          "desc": "ระบุวิธีดำเนินงาน การนำเสนอผลการทดลอง และสรุปอภิปรายผลเป็นระบบ"
        },
        {
          "name": "ส่วนประกอบตอนท้าย (APA 7th)",
          "max": 2,
          "desc": "เขียนรายการอ้างอิงบรรณานุกรมรูปแบบ APA 7th และภาคผนวกสมบูรณ์"
        }
      ]
    },
    "description": "การจัดทำเอกสารรายงานโครงงานคอมพิวเตอร์ตามระเบียบวิธีวิจัยและมาตรฐาน สพฐ.",
    "points": 10,
    "due": "2026-11-15"
  },
  {
    "id": "asg-4",
    "unit": "mod-2",
    "title": "ใบงานที่ 2.1: เรื่อง การวางแผนและการวิเคราะห์ความต้องการในการพัฒนาโครงงาน",
    "desc": "วางแผนพัฒนาโครงงานเว็บไซต์ StyleHub (ร้านจำหน่ายเสื้อผ้าวัยรุ่นออนไลน์) ตามขั้นตอนที่ 1 ของวงจร SDLC",
    "dueDate": "2026-11-30",
    "maxScore": 10,
    "type": "ใบงาน",
    "rubric": {
      "criteria": [
        {
          "name": "การกำหนดวัตถุประสงค์ SMART",
          "max": 3,
          "desc": "วัตถุประสงค์ชัดเจน สอดคล้องกับปัญหา และวัดผลสัมฤทธิ์ได้"
        },
        {
          "name": "การกำหนดขอบเขตและกลุ่มเป้าหมาย",
          "max": 3,
          "desc": "ระบุกลุ่มผู้ใช้เป้าหมายและฟังก์ชันงานระบบได้ชัดเจนและเป็นไปได้จริง"
        },
        {
          "name": "แผนการดำเนินงาน Gantt Chart",
          "max": 4,
          "desc": "ตารางเวลา 8 สัปดาห์ครอบคลุม SDLC จัดสรรบทบาทและทรัพยากรสมบูรณ์"
        }
      ]
    },
    "description": "การกำหนดวัตถุประสงค์ ขอบเขต และแผนภูมิแกนต์ (กรณีศึกษา StyleHub)",
    "points": 10,
    "due": "2026-11-30"
  },
  {
    "id": "asg-5",
    "unit": "mod-2",
    "title": "ใบงานที่ 2.2: เรื่อง การวิเคราะห์ข้อมูลและออกแบบระบบ (Context Diagram & UI)",
    "desc": "วิเคราะห์ความต้องการเชิงหน้าที่ 8 ฟังก์ชัน และออกแบบแผนภาพบริบท (Context Diagram / DFD) ของระบบ StyleHub",
    "dueDate": "2026-12-15",
    "maxScore": 10,
    "type": "ใบงาน",
    "rubric": {
      "criteria": [
        {
          "name": "การวิเคราะห์ 8 ฟังก์ชันหลัก",
          "max": 4,
          "desc": "ระบุข้อกำหนดความต้องการเชิงหน้าที่ได้ครบถ้วน ชัดเจน"
        },
        {
          "name": "การออกแบบ Context Diagram",
          "max": 4,
          "desc": "วาดแผนภาพบริบทแสดง Process 0, Entities และ Data Flows ถูกต้อง"
        },
        {
          "name": "ขอบเขตข้อมูลนำเข้า-ส่งออก",
          "max": 2,
          "desc": "ระบุ Input และ Output ของระบบได้ชัดเจนและสอดคล้องกับระบบ"
        }
      ]
    },
    "description": "การวิเคราะห์ข้อกำหนดเชิงหน้าที่และการออกแบบแผนภาพบริบทระบบพาณิชย์อิเล็กทรอนิกส์",
    "points": 10,
    "due": "2026-12-15"
  },
  {
    "id": "asg-6",
    "unit": "mod-2",
    "title": "ใบงานที่ 2.3: เรื่อง การพัฒนาโครงงานเพื่อแก้ปัญหาตามกระบวนการ SDLC ในบริบทจริง",
    "desc": "วางแผนและพัฒนาโครงงานบูรณาการแนวคิดเชิงคำนวณและวงจร SDLC 5 ขั้นตอน เพื่อแก้ปัญหาในโรงเรียนหรือชุมชนจริง",
    "dueDate": "2026-12-30",
    "maxScore": 10,
    "type": "ใบงาน",
    "rubric": {
      "criteria": [
        {
          "name": "การระบุปัญหาในบริบทจริง",
          "max": 2,
          "desc": "ระบุสภาพปัญหา สาเหตุ ผลกระทบ และกลุ่มเป้าหมายได้ชัดเจน"
        },
        {
          "name": "การวางแผนและวิเคราะห์ระบบ",
          "max": 2,
          "desc": "กำหนดวัตถุประสงค์ ขอบเขต และฟังก์ชันความต้องการได้เหมาะสม"
        },
        {
          "name": "การออกแบบระบบและ UI",
          "max": 2,
          "desc": "ออกแบบฐานข้อมูล 3 ตาราง ผังงาน และหน้าจอใช้งานได้ตามมาตรฐาน"
        },
        {
          "name": "การพัฒนาและทดสอบระบบ",
          "max": 2,
          "desc": "วางแผนการเขียนโปรแกรมและการทดสอบระบบครอบคลุมทุกมิติ"
        },
        {
          "name": "การประเมินผลและการดูแลรักษา",
          "max": 2,
          "desc": "กำหนดตัวชี้วัดความสำเร็จ KPI และแผนการบำรุงรักษาปฏิบัติได้จริง"
        }
      ]
    },
    "description": "การบูรณาการแนวคิดเชิงคำนวณและวงจร SDLC ครบวงจรในการแก้ปัญหาของสถานศึกษาหรือชุมชน",
    "points": 10,
    "due": "2026-12-30"
  }
],
    submissions: [
      {
        id: 'sub-101',
        assignment_id: 'asg-1',
        student_id: 'u-student1',
        student_name: 'นายณัฐวุฒิ เรียนดี',
        content: 'โครงงาน: ระบบจัดการการคัดแยกขยะในโรงเรียน โดยใช้อัลกอริทึม AI ตรวจจับประเภทขยะผ่านกล้อง',
        file_url: 'https://github.com/nattawut/waste-sorting-ai',
        score: 10,
        feedback: 'ยอดเยี่ยมมาก! การย่อยปัญหากับขั้นตอนอัลกอริทึมชัดเจน ลำดับความคิดถูกต้องตามหลักวิชาการ',
        status: 'graded',
        submitted_at: '2026-09-15T14:30:00.000Z'
      },
      {
        id: 'sub-102',
        assignment_id: 'asg-2',
        student_id: 'u-student2',
        student_name: 'นางสาวศิริวรรณ ขยันยิ่ง',
        content: 'เค้าโครงโครงงาน: เว็บแอปพลิเคชันระบบจองคิวห้องซ้อมดนตรีโรงเรียน (Music Room Booking System)',
        file_url: 'https://docs.google.com/document/d/sample-music-proposal',
        score: null,
        feedback: '',
        status: 'submitted',
        submitted_at: '2026-09-17T09:15:00.000Z'
      }
    ],

    quizzes: [
  {
    "id": "quiz-pre-unit1",
    "category": "pretest",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ก่อนเรียน หน่วยการเรียนรู้ที่ 1: แนวคิดเชิงคำนวณกับการแก้ปัญหา (10 ข้อ)",
    "timeLimitMinutes": 15,
    "passcode": "preunit1",
    "questions": [
      {
        "id": "pre1_q1",
        "question": "ทักษะใดจัดเป็นความหมายที่แท้จริงของ \"แนวคิดเชิงคำนวณ (Computational Thinking)\"?",
        "options": [
          "ทักษะการคิดวิเคราะห์เพื่อแก้ปัญหาอย่างเป็นระบบและเป็นขั้นตอน",
          "ทักษะการซ่อมบำรุงและติดตั้งอุปกรณ์ฮาร์ดแวร์คอมพิวเตอร์",
          "ความสามารถในการจดจำคำสั่งของภาษาคอมพิวเตอร์ระดับสูง",
          "ความชำนาญในการพิมพ์ดีดข้อความภาษาอังกฤษด้วยความเร็ว"
        ],
        "correctIndex": 0,
        "explanation": "แนวคิดเชิงคำนวณมุ่งเน้นทักษะการคิดวิเคราะห์ในการแก้ปัญหาอย่างเป็นระบบและเป็นลำดับขั้นตอน"
      },
      {
        "id": "pre1_q2",
        "question": "หากนักเรียนต้องการซ่อมพัดลมที่ไม่หมุน แล้วถอดชิ้นส่วนใบพัด มอเตอร์ และปุ่มกดออกดู ตรงกับองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)"
        ],
        "correctIndex": 1,
        "explanation": "Decomposition คือการแยกย่อยปัญหาหรือระบบออกเป็นส่วนประกอบย่อยๆ เพื่อให้แก้ไขได้ง่ายขึ้น"
      },
      {
        "id": "pre1_q3",
        "question": "การที่นักเรียนจำได้ว่า \"มักจะมีฝนตกหนักทุกวันศุกร์ช่วงเลิกเรียน\" แล้วเตรียมร่มมาโรงเรียน จัดเป็นทักษะใด?",
        "options": [
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การคิดเชิงนามธรรม (Abstraction)"
        ],
        "correctIndex": 2,
        "explanation": "การสังเกตแบบแผนความสม่ำเสมอหรือความคล้ายคลึงของเหตุการณ์ที่เกิดขึ้นซ้ำๆ คือ Pattern Recognition"
      },
      {
        "id": "pre1_q4",
        "question": "การวาดแผนผังโรงเรียนโดยแสดงเฉพาะอาคารเรียนและเส้นทางเดิน โดยตัดต้นไม้และเสาไฟทิ้งไป ตรงกับข้อใด?",
        "options": [
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การคิดเชิงนามธรรม (Abstraction)"
        ],
        "correctIndex": 3,
        "explanation": "Abstraction คือการคัดเลือกเฉพาะข้อมูลที่จำเป็นและตัดรายละเอียดที่ไม่เกี่ยวข้องทิ้งไป"
      },
      {
        "id": "pre1_q5",
        "question": "การเขียนสูตรชงชานมไข่มุกโดยระบุขั้นตอนและปริมาณส่วนผสมอย่างชัดเจน สอดคล้องกับข้อใด?",
        "options": [
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การคิดเชิงนามธรรม (Abstraction)",
          "การหารูปแบบ (Pattern Recognition)"
        ],
        "correctIndex": 0,
        "explanation": "การกำหนดลำดับขั้นตอนการปฏิบัติงานอย่างชัดเจนเป็น Algorithm Design"
      },
      {
        "id": "pre1_q6",
        "question": "ในการเขียนผังงาน (Flowchart) สัญลักษณ์รูป \"วงรีหรือสี่เหลี่ยมมุมมน (Oval)\" ใช้แทนสิ่งใด?",
        "options": [
          "การประมวลผลหรือคำนวณข้อมูล",
          "จุดเริ่มต้นหรือจุดสิ้นสุดการทำงาน",
          "การตรวจสอบเงื่อนไขเพื่อตัดสินใจ",
          "การรับข้อมูลเข้าผ่านทางแป้นพิมพ์"
        ],
        "correctIndex": 1,
        "explanation": "สัญลักษณ์ Terminator (วงรี/สี่เหลี่ยมมุมมน) ใช้แทนจุดเริ่มต้นและสิ้นสุดของผังงาน"
      },
      {
        "id": "pre1_q7",
        "question": "สัญลักษณ์รูป \"สี่เหลี่ยมขนมเปียกปูน (Diamond)\" ในผังงาน ทำหน้าที่อะไร?",
        "options": [
          "แสดงทิศทางการไหลของข้อมูลในผังงาน",
          "แสดงการรับเข้าข้อมูลจากแป้นพิมพ์",
          "ตรวจสอบเงื่อนไขเพื่อตัดสินใจเลือกทำ",
          "คำนวณสูตรคณิตศาสตร์ของโปรแกรม"
        ],
        "correctIndex": 2,
        "explanation": "Decision (สี่เหลี่ยมขนมเปียกปูน) ใช้สำหรับตรวจสอบเงื่อนไขในการตัดสินใจ"
      },
      {
        "id": "pre1_q8",
        "question": "ตัวย่อ \"SDLC\" ในการพัฒนาโครงงานคอมพิวเตอร์ ย่อมาจากคำภาษาอังกฤษในข้อใด?",
        "options": [
          "Software Data Learning Center",
          "System Digital Line Communication",
          "Standard Device Logic Control",
          "System Development Life Cycle"
        ],
        "correctIndex": 3,
        "explanation": "SDLC ย่อมาจาก System Development Life Cycle (วงจรการพัฒนาระบบ)"
      },
      {
        "id": "pre1_q9",
        "question": "ขั้นตอนแรกสุดของการพัฒนาโครงงานคอมพิวเตอร์ตามวงจร SDLC คือขั้นตอนใด?",
        "options": [
          "ขั้นการวางแผน (Planning)",
          "ขั้นการเขียนโค้ด (Implementation)",
          "ขั้นการออกแบบหน้าจอ (Design)",
          "ขั้นการบำรุงรักษา (Maintenance)"
        ],
        "correctIndex": 0,
        "explanation": "วงจร SDLC เริ่มต้นจากขั้นตอนการวางแผน (Planning)"
      },
      {
        "id": "pre1_q10",
        "question": "ข้อใดเป็นประโยชน์สำคัญที่สุดของการเขียนผังงาน (Flowchart) ก่อนลงมือเขียนโปรแกรมจริง?",
        "options": [
          "ช่วยลดต้นทุนในการจัดซื้อคอมพิวเตอร์",
          "ช่วยให้มองเห็นลำดับขั้นตอนการทำงานชัดเจน",
          "ช่วยให้คอมพิวเตอร์ประมวลผลเร็วขึ้นทันที",
          "ป้องกันไม่ให้ไวรัสคอมพิวเตอร์เข้าสู่ระบบ"
        ],
        "correctIndex": 1,
        "explanation": "ผังงานช่วยถ่ายทอดขั้นตอนวิธีออกมาเป็นภาพแผนผัง ทำให้มองเห็นลำดับการทำงานและตรวจสอบข้อผิดพลาดได้ง่าย"
      }
    ]
  },
  {
    "id": "quiz-pre-unit2",
    "category": "pretest",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ก่อนเรียน หน่วยการเรียนรู้ที่ 2: การแก้ปัญหาและการพัฒนาโครงงาน (10 ข้อ)",
    "timeLimitMinutes": 15,
    "passcode": "preunit2",
    "questions": [
      {
        "id": "pre2_q1",
        "question": "การเริ่มต้นพัฒนาโครงงานคอมพิวเตอร์ที่ดีที่สุด ควรเริ่มต้นจากสิ่งใดเป็นอันดับแรก?",
        "options": [
          "ซื้อเครื่องคอมพิวเตอร์และอุปกรณ์อิเล็กทรอนิกส์ใหม่",
          "เลือกภาษาคอมพิวเตอร์ที่มีความซับซ้อนและทันสมัยที่สุด",
          "ค้นหาและทำความเข้าใจปัญหาที่พบในชีวิตจริงหรือชุมชน",
          "ออกแบบโลโก้และชื่อโครงงานให้ดูน่าสนใจก่อนสิ่งอื่น"
        ],
        "correctIndex": 2,
        "explanation": "การเริ่มต้นที่ดีต้องเริ่มจากการสำรวจและทำความเข้าใจปัญหาจริงที่เกิดขึ้นเพื่อหาแนวทางแก้ไข"
      },
      {
        "id": "pre2_q2",
        "question": "หากต้องการพัฒนาระบบเพื่อช่วยเหลือนักเรียนในโรงเรียน กลุ่มบุคคลใดที่ควรไปสัมภาษณ์เพื่อสอบถามปัญหา?",
        "options": [
          "เจ้าหน้าที่รักษาความปลอดภัยของหมู่บ้าน",
          "ช่างเทคนิคผู้ดูแลศูนย์ข้อมูลคอมพิวเตอร์",
          "พนักงานขายสินค้าในห้างสรรพสินค้า",
          "นักเรียนและครูผู้มีส่วนเกี่ยวข้องในโรงเรียน"
        ],
        "correctIndex": 3,
        "explanation": "การวิเคราะห์ปัญหาต้องเก็บข้อมูลจากกลุ่มผู้ใช้จริง (Stakeholders / End Users)"
      },
      {
        "id": "pre2_q3",
        "question": "การวาดภาพร่างหน้าจอแอปพลิเคชันอย่างง่ายบนกระดาษ (Wireframe) มีจุดประสงค์เพื่อสิ่งใด?",
        "options": [
          "เพื่อวางแผนจัดวางตำแหน่งปุ่มและเมนูการใช้งานเบื้องต้น",
          "เพื่อคำนวณงบประมาณการจัดซื้อคอมพิวเตอร์อย่างแม่นยำ",
          "เพื่อทดสอบความเร็วในการเชื่อมต่ออินเทอร์เน็ตของระบบ",
          "เพื่อส่งมอบผลงานเป็นโปรแกรมที่พร้อมใช้งานจริงทันที"
        ],
        "correctIndex": 0,
        "explanation": "Wireframe ใช้สำหรับวางโครงสร้างและตำแหน่งขององค์ประกอบต่างๆ บนหน้าจอก่อนลงมือพัฒนาจริง"
      },
      {
        "id": "pre2_q4",
        "question": "ในการพัฒนาแอปพลิเคชันเพื่อผู้สูงอายุ สิ่งสำคัญที่สุดที่ต้องคำนึงถึงในการออกแบบหน้าจอคือข้อใด?",
        "options": [
          "การเลือกใช้ฟอนต์ตัวเขียนภาษาอังกฤษขนาดเล็ก",
          "ขนาดตัวอักษรที่ใหญ่อ่านชัดเจนและปุ่มกดขนาดใหญ่",
          "การใส่ภาพกราฟิกเคลื่อนไหวสามมิติในทุกหน้าจอ",
          "การซ่อนปุ่มเมนูทั้งหมดไว้ในแถบเลื่อนด้านข้าง"
        ],
        "correctIndex": 1,
        "explanation": "การออกแบบเพื่อผู้สูงอายุ (Elderly-Friendly Design) ต้องเน้นขนาดตัวหนังสือใหญ่ ชัดเจน อ่านง่าย ไม่ซับซ้อน"
      },
      {
        "id": "pre2_q5",
        "question": "แผนภาพกระแสข้อมูล (Data Flow Diagram - DFD) แสดงสิ่งใดในการทำงานของระบบโครงงาน?",
        "options": [
          "แผนผังห้องปฏิบัติการคอมพิวเตอร์และสายสัญญาณ",
          "รายชื่อโปรแกรมเมอร์และหน้าที่รับผิดชอบแต่ละคน",
          "ทิศทางการไหลและการประมวลผลข้อมูลในระบบ",
          "ราคาสินค้าและค่าใช้จ่ายในการพัฒนาโปรแกรม"
        ],
        "correctIndex": 2,
        "explanation": "DFD แสดงการไหลของข้อมูล กระบวนการประมวลผล และแหล่งจัดเก็บข้อมูล"
      },
      {
        "id": "pre2_q6",
        "question": "หลังจากเขียนโปรแกรมเสร็จแล้ว ขั้นตอนสำคัญที่ต้องทำก่อนนำโปรแกรมไปให้ผู้อื่นใช้งานจริงคือข้อใด?",
        "options": [
          "การทดสอบการทำงานของโปรแกรมเพื่อหาข้อผิดพลาด (Testing)",
          "การลบซอร์สโค้ดโปรแกรมออกจากเครื่องคอมพิวเตอร์",
          "การจัดพิมพ์รายงานโครงงานฉบับสมบูรณ์ส่งประกวดทันที",
          "การปิดระบบไม่ให้ผู้ใดสามารถเชื่อมต่อเข้าใช้งานได้"
        ],
        "correctIndex": 0,
        "explanation": "ต้องผ่านการทดสอบระบบ (Testing) เพื่อให้มั่นใจว่าโปรแกรมทำงานได้ถูกต้องและปลอดภัย"
      },
      {
        "id": "pre2_q7",
        "question": "คำว่า \"บั๊ก (Bug)\" ในวงการพัฒนาซอฟต์แวร์คอมพิวเตอร์ มีความหมายตรงกับข้อใด?",
        "options": [
          "อุปกรณ์ฮาร์ดแวร์คอมพิวเตอร์ที่มีราคาแพง",
          "ภาษาคอมพิวเตอร์ที่ใช้สำหรับการเขียนเว็บ",
          "ระบบปฏิบัติการรุ่นใหม่ล่าสุดของโทรศัพท์",
          "ข้อผิดพลาดหรือจุดบกพร่องในโปรแกรมคอมพิวเตอร์"
        ],
        "correctIndex": 3,
        "explanation": "Bug หมายถึงข้อผิดพลาด จุดบกพร่อง หรือปัญหาในการทำงานของโปรแกรมคอมพิวเตอร์"
      },
      {
        "id": "pre2_q8",
        "question": "ข้อใดเป็นแนวปฏิบัติที่ถูกต้องตามจริยธรรมในการนำรูปภาพจากอินเทอร์เน็ตมาใช้ในโครงงาน?",
        "options": [
          "ตัดส่วนที่เป็นลายน้ำชื่อเจ้าของภาพออกก่อนนำมาใช้",
          "เลือกใช้ภาพที่อนุญาตให้ใช้ฟรีและระบุแหล่งที่มาอ้างอิง",
          "คัดลอกภาพของผู้อื่นมาใช้และอ้างว่าเป็นผู้ถ่ายภาพเอง",
          "ดาวน์โหลดภาพใดก็ได้โดยไม่ต้องคำนึงถึงลิขสิทธิ์ภาพ"
        ],
        "correctIndex": 1,
        "explanation": "ต้องเคารพลิขสิทธิ์ โดยเลือกภาพที่ได้รับอนุญาต (เช่น Creative Commons) และอ้างอิงแหล่งที่มาถูกต้อง"
      },
      {
        "id": "pre2_q9",
        "question": "หากโครงงานที่นักเรียนพัฒนาขึ้น มีระบบล็อกอินเข้าสู่ระบบ สิ่งสำคัญที่สุดในการดูแลข้อมูลผู้ใช้คือข้อใด?",
        "options": [
          "ประกาศรหัสผ่านของสมาชิกทุกคนบนบอร์ดประชาสัมพันธ์",
          "ใช้รหัสผ่านเดียวกันทั้งหมดเพื่อความสะดวกในการจดจำ",
          "เก็บรักษาข้อมูลส่วนตัวและรหัสผ่านของผู้ใช้อย่างปลอดภัย",
          "อนุญาตให้สมาชิกคนใดก็ได้แก้ไขรหัสผ่านของผู้อื่นได้"
        ],
        "correctIndex": 2,
        "explanation": "ต้องรักษาความปลอดภัยและความเป็นส่วนตัวของข้อมูลผู้ใช้งาน ไม่เปิดเผยให้บุคคลอื่นเข้าถึงได้"
      },
      {
        "id": "pre2_q10",
        "question": "ทักษะสำคัญที่สุดในการทำงานโครงงานคอมพิวเตอร์ร่วมกันเป็นกลุ่มคือข้อใด?",
        "options": [
          "การทำงานคนเดียวทั้งหมดโดยไม่ปรึกษาเพื่อนร่วมทีม",
          "การแบ่งหน้าที่ตามความถนัดและการสื่อสารแลกเปลี่ยนกัน",
          "การเลือกเฉพาะเพื่อนสนิทโดยไม่เปิดรับความคิดเห็นอื่น",
          "การให้หัวหน้ากลุ่มเป็นผู้ตัดสินใจแทนทุกคนทุกเรื่อง"
        ],
        "correctIndex": 1,
        "explanation": "การทำงานเป็นทีมต้องอาศัยการแบ่งงานตามความถนัด การสื่อสาร และการรับฟังความคิดเห็นร่วมกัน"
      }
    ]
  },
  {
    "id": "quiz-unit1",
    "category": "unit",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนท้ายหน่วยที่ 1: แนวคิดเชิงคำนวณกับการแก้ปัญหา (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "unit1",
    "questions": [
      {
        "id": "u1_q1",
        "question": "แนวคิดเชิงคำนวณ (Computational Thinking) มีเป้าหมายสำคัญที่สุดตามข้อใด?",
        "options": [
          "เพื่อคิดแก้ปัญหาอย่างเป็นระบบจนได้ขั้นตอนที่นำไปปฏิบัติได้จริง",
          "เพื่อฝึกเขียนโค้ดด้วยภาษาคอมพิวเตอร์ระดับสูงให้รวดเร็วที่สุด",
          "เพื่อเรียนรู้วิธีประกอบและซ่อมแซมชิ้นส่วนคอมพิวเตอร์เบื้องต้น",
          "เพื่อคำนวณโจทย์คณิตศาสตร์ที่ซับซ้อนโดยใช้โปรแกรมอัตโนมัติ"
        ],
        "correctIndex": 0,
        "explanation": "แนวคิดเชิงคำนวณมุ่งเน้นการคิดวิเคราะห์แก้ปัญหาอย่างเป็นระบบ เพื่อให้ได้ขั้นตอนวิธี (Algorithm) ที่มนุษย์และคอมพิวเตอร์นำไปปฏิบัติตามได้อย่างมีประสิทธิภาพ"
      },
      {
        "id": "u1_q2",
        "question": "การที่นักเรียนแยกชิ้นส่วนจักรยานออกเป็นระบบขับเคลื่อน ระบบเบรก และโครงรถ ตรงกับองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)"
        ],
        "correctIndex": 1,
        "explanation": "การแยกส่วนประกอบและการย่อยปัญหา (Decomposition) คือการแตกปัญหาหรือระบบที่ซับซ้อนออกเป็นส่วนประกอบย่อยๆ เพื่อให้จัดการและแก้ไขได้ง่ายขึ้น"
      },
      {
        "id": "u1_q3",
        "question": "ข้อใดเป็นตัวอย่างของการนำ \"การหารูปแบบ (Pattern Recognition)\" มาใช้แก้ปัญหาในชีวิตประจำวัน?",
        "options": [
          "การแบ่งขั้นตอนการทำรายงานโครงงานออกเป็น 5 กิจกรรมย่อย",
          "การสรุปเฉพาะใจความสำคัญของเนื้อหาบทเรียนเพื่ออ่านทบทวน",
          "การสังเกตเวลาที่รถติดเป็นประจำเพื่อเลือกช่วงเวลาเดินทางที่เหมาะสม",
          "การจดบันทึกรายรับรายจ่ายในแต่ละวันอย่างละเอียดลงในสมุดบัญชี"
        ],
        "correctIndex": 2,
        "explanation": "การหารูปแบบคือการสังเกตความเหมือน ความคล้ายคลึง หรือแบบแผนที่เกิดขึ้นซ้ำๆ ของเหตุการณ์ เพื่อคาดการณ์หรือวางแผนแก้ปัญหา"
      },
      {
        "id": "u1_q4",
        "question": "แผนที่รถไฟฟ้าที่ตัดรายละเอียดตึกรามบ้านช่องออก แล้วแสดงเฉพาะสถานีและเส้นทางเชื่อมต่อ จัดเป็นองค์ประกอบใด?",
        "options": [
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การคิดเชิงนามธรรม (Abstraction)"
        ],
        "correctIndex": 3,
        "explanation": "การคิดเชิงนามธรรม (Abstraction) คือการคัดกรองเฉพาะข้อมูลที่จำเป็นต่อการแก้ปัญหา และตัดรายละเอียดที่ไม่เกี่ยวข้องออกไป"
      },
      {
        "id": "u1_q5",
        "question": "การออกแบบขั้นตอนวิธี (Algorithm) ที่ดีควรมีลักษณะสำคัญอย่างไรมากที่สุด?",
        "options": [
          "มีลำดับขั้นตอนชัดเจน ไม่คลุมเครือ และนำไปปฏิบัติตามได้ผลลัพธ์ถูกต้อง",
          "ใช้คำสั่งภาษาอังกฤษระดับสูงที่สั้นที่สุดเพื่อประหยัดเนื้อที่หน่วยความจำ",
          "มีความซับซ้อนสูงเพื่อให้ผู้อื่นไม่สามารถคัดลอกวิธีการแก้ปัญหาไปใช้ได้",
          "ออกแบบขึ้นโดยเน้นการทำงานด้วยคอมพิวเตอร์เท่านั้น มนุษย์ไม่สามารถทำตามได้"
        ],
        "correctIndex": 0,
        "explanation": "ขั้นตอนวิธีที่ดีต้องมีความชัดเจน มีจุดเริ่มต้นและจุดสิ้นสุดที่แน่นอน ไม่กำกวม และเมื่อปฏิบัติตามลำดับจะได้ผลลัพธ์ที่ถูกต้องเสมอ"
      },
      {
        "id": "u1_q6",
        "question": "สัญลักษณ์ผังงาน (Flowchart) รูป \"สี่เหลี่ยมขนมเปียกปูน (Diamond)\" ใช้แทนความหมายใดในการเขียนผังงาน?",
        "options": [
          "การเริ่มต้นหรือสิ้นสุดการทำงานของระบบ",
          "การตัดสินใจหรือตรวจสอบเงื่อนไขการทำงาน",
          "การประมวลผลหรือคำนวณข้อมูลทางคณิตศาสตร์",
          "การรับข้อมูลเข้าสู่ระบบผ่านทางแป้นพิมพ์"
        ],
        "correctIndex": 1,
        "explanation": "สัญลักษณ์สี่เหลี่ยมขนมเปียกปูน (Decision) ใช้สำหรับการตรวจสอบเงื่อนไขเพื่อตัดสินใจเลือกทิศทางการทำงานต่อไป"
      },
      {
        "id": "u1_q7",
        "question": "หากต้องการเขียนผังงานแสดงขั้นตอนการคำนวณ \"พื้นที่รูปสามเหลี่ยม = 0.5 * ฐาน * สูง\" ควรเลือกใช้สัญลักษณ์ใด?",
        "options": [
          "วงรี (Oval) สำหรับจุดเริ่มต้น",
          "สี่เหลี่ยมขนมเปียกปูน (Diamond) สำหรับเงื่อนไข",
          "สี่เหลี่ยมผืนผ้า (Rectangle) สำหรับประมวลผล",
          "สี่เหลี่ยมด้านขนาน (Parallelogram) สำหรับแสดงผล"
        ],
        "correctIndex": 2,
        "explanation": "สัญลักษณ์สี่เหลี่ยมผืนผ้า (Process) ใช้สำหรับขั้นตอนการปฏิบัติงาน การคำนวณ หรือการกำหนดค่าข้อมูล"
      },
      {
        "id": "u1_q8",
        "question": "การทำงานในข้อใดจัดเป็นโครงสร้างการทำงาน \"แบบวนซ้ำ (Loop / Iteration)\"?",
        "options": [
          "การคำนวณเกรดเฉลี่ยของนักเรียนหนึ่งคนจากคะแนนเก็บรวม",
          "การเลือกเปิดไฟเมื่อห้องมืด หรือปิดไฟเมื่อห้องสว่างเพียงพอ",
          "การพิมพ์รายงานเอกสารออกทางเครื่องพิมพ์ทีละหน้าจนครบแผ่น",
          "การวิ่งรอบสนามไปเรื่อยๆ จนกว่าจะครบ 5 รอบตามที่ครูกำหนดไว้"
        ],
        "correctIndex": 3,
        "explanation": "การวิ่งรอบสนามจนกว่าจะครบ 5 รอบ มีการทำซ้ำกิจกรรมเดิมตามเงื่อนไขที่กำหนด จึงเป็นโครงสร้างแบบวนซ้ำ"
      },
      {
        "id": "u1_q9",
        "question": "วงจรการพัฒนาระบบ SDLC ขั้นตอนแรกสุดที่ต้องดำเนินการคือข้อใด?",
        "options": [
          "การวางแผน (Planning)",
          "การวิเคราะห์ (Analysis)",
          "การออกแบบ (Design)",
          "การติดตั้ง (Implementation)"
        ],
        "correctIndex": 0,
        "explanation": "วงจร SDLC เริ่มต้นด้วยการวางแผน (Planning) เพื่อกำหนดเป้าหมาย ขอบเขต เวลา และศึกษาความเป็นไปได้ของโครงงาน"
      },
      {
        "id": "u1_q10",
        "question": "เครื่องมือใดนิยมนำมาใช้ในการวางแผนจัดสรรเวลาและติดตามความก้าวหน้าของโครงงานตลอด 20 สัปดาห์?",
        "options": [
          "แผนภาพกระแสข้อมูล (DFD)",
          "แผนภูมิแท่งแกนต์ (Gantt Chart)",
          "แบบจำลองความสัมพันธ์ข้อมูล (ERD)",
          "ผังโครงสร้างหน้าจอจำลอง (Wireframe)"
        ],
        "correctIndex": 1,
        "explanation": "แผนภูมิแกนต์ชาร์ต (Gantt Chart) เป็นแผนภูมิแท่งแนวนอนที่ใช้กำหนดกิจกรรมและกรอบเวลาการดำเนินงานของโครงงานอย่างชัดเจน"
      },
      {
        "id": "u1_q11",
        "question": "ในขั้นตอน \"การวิเคราะห์ระบบ (Analysis)\" กิจกรรมสำคัญที่สุดที่ผู้พัฒนาโครงงานต้องทำคือข้อใด?",
        "options": [
          "การเขียนโค้ดโปรแกรมเพื่อทดสอบการเชื่อมต่อระบบ",
          "การออกแบบภาพหน้าจอส่วนติดต่อผู้ใช้งานให้สวยงาม",
          "การรวบรวมและวิเคราะห์ความต้องการของผู้ใช้งานระบบ",
          "การติดตั้งซอฟต์แวร์บนเครื่องแม่ข่ายเพื่อเปิดใช้งาน"
        ],
        "correctIndex": 2,
        "explanation": "การวิเคราะห์ระบบมุ่งเน้นการเก็บรวบรวมและวิเคราะห์ความต้องการ (Requirements) จากผู้ใช้งานเพื่อกำหนดฟังก์ชันที่ระบบต้องมี"
      },
      {
        "id": "u1_q12",
        "question": "แผนภาพกระแสข้อมูล (Data Flow Diagram - DFD) มีประโยชน์หลักในการพัฒนาโครงงานอย่างไร?",
        "options": [
          "แสดงแผนผังเครือข่ายและตำแหน่งที่ตั้งของคอมพิวเตอร์",
          "แสดงขั้นตอนการเขียนโปรแกรมและการประกาศตัวแปร",
          "แสดงค่าใช้จ่ายในการจัดซื้ออุปกรณ์ฮาร์ดแวร์ทั้งหมด",
          "แสดงเส้นทางการไหลของข้อมูลระหว่างผู้ใช้กับระบบ"
        ],
        "correctIndex": 3,
        "explanation": "DFD แสดงการไหลของข้อมูล (Data Flow) แหล่งกำเนิด/ปลายทางข้อมูล กระบวนการประมวลผล และแหล่งจัดเก็บข้อมูลในระบบ"
      },
      {
        "id": "u1_q13",
        "question": "การสร้างแบบจำลองหน้าจอคร่าวๆ (Wireframe) ของเว็บไซต์ จัดอยู่ในขั้นตอนใดของวงจร SDLC?",
        "options": [
          "ขั้นการออกแบบ (Design)",
          "ขั้นการวางแผน (Planning)",
          "ขั้นการวิเคราะห์ (Analysis)",
          "ขั้นการบำรุงรักษา (Maintenance)"
        ],
        "correctIndex": 0,
        "explanation": "การออกแบบ Wireframe, สถาปัตยกรรมระบบ และโครงสร้างฐานข้อมูล จัดอยู่ในขั้นตอนการออกแบบ (Design)"
      },
      {
        "id": "u1_q14",
        "question": "การทดสอบโปรแกรมในระดับย่อยที่สุด โดยทดสอบแต่ละฟังก์ชันหรือแต่ละโมดูล เรียกว่าการทดสอบระดับใด?",
        "options": [
          "การทดสอบการยอมรับของผู้ใช้ (Acceptance Testing)",
          "การทดสอบระดับหน่วยย่อย (Unit Testing)",
          "การทดสอบการทำงานร่วมกัน (Integration Testing)",
          "การทดสอบระบบภาพรวมทั้งหมด (System Testing)"
        ],
        "correctIndex": 1,
        "explanation": "Unit Testing คือการทดสอบฟังก์ชันย่อยหรือโมดูลเดี่ยวๆ แต่ละส่วน เพื่อยืนยันว่าทำงานถูกต้องก่อนนำมาประกอบกัน"
      },
      {
        "id": "u1_q15",
        "question": "ข้อใดเป็นกิจกรรมที่เกิดขึ้นในขั้นตอน \"การบำรุงรักษาระบบ (Maintenance)\" ของวงจร SDLC?",
        "options": [
          "การสัมภาษณ์กลุ่มผู้ใช้งานเพื่อหาข้อบกพร่องของระบบเดิม",
          "การร่างโครงสร้างตารางข้อมูลเพื่อเตรียมความพร้อมฐานข้อมูล",
          "การแก้ไขข้อผิดพลาด (Bugs) และปรับปรุงระบบหลังส่งมอบงาน",
          "การเขียนคู่มือการติดตั้งระบบและเอกสารประกอบการใช้งาน"
        ],
        "correctIndex": 2,
        "explanation": "ขั้นตอนการบำรุงรักษาทำหน้าที่ดูแล แก้ไขข้อผิดพลาดที่พบหลังใช้งานจริง และปรับปรุงระบบให้ทันสมัยอยู่เสมอ"
      },
      {
        "id": "u1_q16",
        "question": "การศึกษาความเป็นไปได้ (Feasibility Study) ด้านใด ที่มุ่งประเมินว่ามีเทคโนโลยี เครื่องมือ และทักษะเพียงพอต่อการพัฒนาหรือไม่?",
        "options": [
          "ด้านเศรษฐศาสตร์ (Economic Feasibility)",
          "ด้านกฎหมาย (Legal Feasibility)",
          "ด้านการดำเนินงาน (Operational Feasibility)",
          "ด้านเทคนิค (Technical Feasibility)"
        ],
        "correctIndex": 3,
        "explanation": "Technical Feasibility ประเมินความพร้อมด้านฮาร์ดแวร์ ซอฟต์แวร์ และทักษะความรู้ทางเทคนิคของทีมงาน"
      },
      {
        "id": "u1_q17",
        "question": "ในรายงานโครงงานคอมพิวเตอร์ 5 บท ส่วน \"ที่มาและความสำคัญของโครงงาน\" บรรจุอยู่ในบทใด?",
        "options": [
          "บทที่ 1 บทนำ",
          "บทที่ 2 เอกสารที่เกี่ยวข้อง",
          "บทที่ 3 วิธีดำเนินงาน",
          "บทที่ 4 ผลการดำเนินงาน"
        ],
        "correctIndex": 0,
        "explanation": "บทที่ 1 บทนำ ประกอบด้วย ความเป็นมาและความสำคัญ วัตถุประสงค์ ขอบเขต และประโยชน์ที่คาดว่าจะได้รับ"
      },
      {
        "id": "u1_q18",
        "question": "หากต้องการเขียนอธิบายขั้นตอนการพัฒนาโปรแกรม เครื่องมือที่ใช้ และภาษาคอมพิวเตอร์ที่เลือกใช้ ควรบันทึกลงในส่วนใด?",
        "options": [
          "บทที่ 2 เอกสารและทฤษฎีที่เกี่ยวข้อง",
          "บทที่ 3 วิธีการดำเนินงานโครงงาน",
          "บทที่ 4 ผลการดำเนินงานและการทดสอบ",
          "บทที่ 5 สรุปผลและข้อเสนอแนะ"
        ],
        "correctIndex": 1,
        "explanation": "บทที่ 3 วิธีการดำเนินงาน อธิบายขั้นตอนการทำงานตามวงจร SDLC เครื่องมือ วัสดุอุปกรณ์ และขั้นตอนวิธีที่พัฒนาขึ้น"
      },
      {
        "id": "u1_q19",
        "question": "ส่วนประกอบใดในรายงานโครงงานที่จัดอยู่ใน \"ส่วนประกอบตอนต้น (Preliminary Section)\" ก่อนเริ่มบทที่ 1?",
        "options": [
          "ภาคผนวก (Appendix)",
          "บรรณานุกรม (Bibliography)",
          "บทคัดย่อ (Abstract)",
          "ข้อเสนอแนะในการพัฒนาต่อ"
        ],
        "correctIndex": 2,
        "explanation": "ส่วนประกอบตอนต้นได้แก่ ปกหน้า ใบรองปก บทคัดย่อ กิตติกรรมประกาศ สารบัญ สารบัญตาราง และสารบัญภาพ"
      },
      {
        "id": "u1_q20",
        "question": "หากพบข้อผิดพลาดขณะรันโปรแกรม (Runtime Error) ทำให้โปรแกรมปิดลง ขั้นตอนที่ถูกต้องในการแก้ปัญหาตามแนวคิดเชิงคำนวณคือข้อใด?",
        "options": [
          "ลบโค้ดโปรแกรมทั้งหมดแล้วเริ่มต้นเขียนระบบใหม่ตั้งแต่ขั้นตอนแรก",
          "เปลี่ยนภาษาคอมพิวเตอร์ที่ใช้เขียนโปรแกรมเป็นภาษาอื่นทันที",
          "ส่งมอบโปรแกรมให้ผู้ใช้งานทันทีโดยไม่ต้องแก้ไขข้อผิดพลาดนั้น",
          "ตรวจสอบตำแหน่งที่เกิดปัญหา หาสาเหตุ แล้วแก้ไขข้อผิดพลาด (Debug)"
        ],
        "correctIndex": 3,
        "explanation": "การค้นหาจุดผิดพลาด หาสาเหตุ และแก้ไข (Debugging) เป็นกระบวนการแก้ปัญหาอย่างเป็นระบบและมีประสิทธิภาพ"
      }
    ]
  },
  {
    "id": "quiz-unit2",
    "category": "unit",
    "title": "แบบทดสอบวัดผลสัมฤทธิ์ทางการเรียนท้ายหน่วยที่ 2: การแก้ปัญหาและการพัฒนาโครงงาน (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "unit2",
    "questions": [
      {
        "id": "u2_q1",
        "question": "ในโครงงานพัฒนาเว็บไซต์ห้องสมุดโรงเรียน การสำรวจพบว่า \"นักเรียนหาหนังสือไม่พบและไม่ทราบว่าหนังสือว่างหรือไม่\" ขั้นแรกสุดในการแก้ปัญหาคือข้อใด?",
        "options": [
          "ซื้อเครื่องคอมพิวเตอร์สเปกสูงมาติดตั้งในห้องสมุดทันที",
          "ทำการจัดเรียงหนังสือทั้งหมดใหม่ตามลำดับความหนาของเล่ม",
          "กำหนดและทำความเข้าใจปัญหาให้ชัดเจนก่อนเริ่มต้นวางแผน",
          "เขียนโปรแกรมระบบยืมคืนหนังสือด้วยภาษาคอมพิวเตอร์ทันที"
        ],
        "correctIndex": 2,
        "explanation": "การกำหนดและทำความเข้าใจปัญหา (Problem Understanding) เป็นรากฐานสำคัญของการวางแผนและพัฒนาโครงงาน"
      },
      {
        "id": "u2_q2",
        "question": "การแยกย่อยระบบห้องสมุดออกเป็น \"ระบบค้นหาหนังสือ ระบบยืมคืน และระบบจัดการข้อมูลสมาชิก\" สอดคล้องกับข้อใด?",
        "options": [
          "การแยกส่วนประกอบและการย่อยปัญหา (Decomposition)",
          "การคิดเชิงนามธรรมเพื่อคัดกรองข้อมูล (Abstraction)",
          "การออกแบบขั้นตอนวิธีในการประมวลผล (Algorithm Design)",
          "การหารูปแบบพฤติกรรมการยืมหนังสือ (Pattern Recognition)"
        ],
        "correctIndex": 0,
        "explanation": "การแตกโครงงานระบบใหญ่เป็นระบบย่อยๆ เป็นการประยุกต์ใช้ Decomposition"
      },
      {
        "id": "u2_q3",
        "question": "การสังเกตว่า \"ช่วงใกล้สอบจะมีนักเรียนมายืมหนังสือหมวดวิทยาศาสตร์และคณิตศาสตร์มากเป็นพิเศษ\" จัดเป็นองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การหารูปแบบ (Pattern Recognition)"
        ],
        "correctIndex": 3,
        "explanation": "การสังเกตพฤติกรรมที่มีความสม่ำเสมอซ้ำๆ จัดเป็น Pattern Recognition"
      },
      {
        "id": "u2_q4",
        "question": "ในการออกแบบบัตรรายการหนังสือ ข้อมูลใดจัดเป็น \"สาระสำคัญ\" ที่ต้องแสดงในระบบค้นหาหนังสือห้องสมุด?",
        "options": [
          "สีของปกหนังสือและความหนาของกระดาษ",
          "ชื่อหนังสือ ชื่อผู้แต่ง และหมวดหมู่หนังสือ",
          "ประวัติส่วนตัวและสถานที่ทำงานของผู้แต่ง",
          "ราคาจำหน่ายและยอดพิมพ์ของสำนักพิมพ์"
        ],
        "correctIndex": 1,
        "explanation": "ชื่อเรื่อง ผู้แต่ง และหมวดหมู่ เป็นข้อมูลสำคัญ (Abstraction) ในการค้นหาหนังสือ"
      },
      {
        "id": "u2_q5",
        "question": "การออกแบบขั้นตอนวิธีในการค้นหาหนังสือตามลำดับชื่อผู้แต่ง โดยเรียงจาก ก ถึง ฮ ตรงกับรูปแบบขั้นตอนวิธีใด?",
        "options": [
          "ขั้นตอนวิธีแบบเรียงลำดับ (Sorting Algorithm)",
          "ขั้นตอนวิธีแบบเลือกสุ่ม (Random Algorithm)",
          "ขั้นตอนวิธีแบบย้อนรอย (Backtracking Algorithm)",
          "ขั้นตอนวิธีแบบแบ่งแยกและเอาชนะ (Divide & Conquer)"
        ],
        "correctIndex": 0,
        "explanation": "การจัดเรียงข้อมูลตามตัวอักษรเป็น Sorting Algorithm"
      },
      {
        "id": "u2_q6",
        "question": "ในกรณีศึกษาโครงงานเว็บไซต์ห้องสมุด ผู้ใช้งานกลุ่มใดถือเป็น \"ผู้ใช้งานหลัก (End User)\" ที่ต้องนำความคิดเห็นมาออกแบบหน้าจอ?",
        "options": [
          "เจ้าหน้าที่ช่างเทคนิคดูแลเซิร์ฟเวอร์",
          "ผู้บริหารและคณะกรรมการสถานศึกษา",
          "นักเรียนและครูผู้เข้ามาใช้งานห้องสมุด",
          "พนักงานร้านจำหน่ายหนังสือภายนอก"
        ],
        "correctIndex": 2,
        "explanation": "นักเรียนและครูเป็นกลุ่มผู้ใช้งานจริงของระบบห้องสมุด"
      },
      {
        "id": "u2_q7",
        "question": "ในโครงงานพัฒนาแอปพลิเคชันแจ้งเตือนการกินยาสำหรับผู้สูงอายุ ปัญหาสำคัญที่สุดที่พบในกลุ่มผู้สูงอายุคือข้อใด?",
        "options": [
          "ผู้สูงอายุต้องการแอปพลิเคชันที่มีเกมสะสมแต้ม",
          "ผู้สูงอายุลืมกินยาและอ่านตัวหนังสือขนาดเล็กไม่ชัด",
          "ผู้สูงอายุต้องการเชื่อมต่อแอปพลิเคชันกับนาฬิกาหรู",
          "ผู้สูงอายุชอบฟังก์ชันที่มีปุ่มกดจำนวนมากหลายหน้า"
        ],
        "correctIndex": 1,
        "explanation": "ปัญหาหลักของผู้สูงอายุคือการลืมเวลาทานยาและภาวะสายตายาวตามวัย"
      },
      {
        "id": "u2_q8",
        "question": "การออกแบบหน้าจอแอปพลิเคชันสำหรับผู้สูงอายุ (Elderly-Friendly UI) ควรยึดหลักการใดมากที่สุด?",
        "options": [
          "ใช้ภาพเคลื่อนไหวสามมิติและกราฟิกที่ซับซ้อน",
          "ใช้ข้อความภาษาอังกฤษตัวพิมพ์เล็กและฟอนต์ประดิษฐ์",
          "รวมปุ่มคำสั่งทั้งหมดไว้ในเมนูย่อยที่ซ่อนอยู่ลึกๆ",
          "ใช้ตัวอักษรขนาดใหญ่ สีสันชัดเจน และมีปุ่มกดขนาดใหญ่"
        ],
        "correctIndex": 3,
        "explanation": "การออกแบบเพื่อผู้สูงอายุต้องเน้นตัวอักษรใหญ่ ชัดเจน อ่านง่าย ไม่ซับซ้อน"
      },
      {
        "id": "u2_q9",
        "question": "เงื่อนไขในแอปเตือนยา: \"หากผู้ใช้กดปุ่ม เลื่อนเตือน (Snooze) ให้ระบบรอ 10 นาทีแล้วส่งเสียงเตือนซ้ำอีกครั้ง\" จัดเป็นโครงสร้างแบบใด?",
        "options": [
          "โครงสร้างแบบเรียงลำดับเส้นตรงไม่มีเงื่อนไข",
          "โครงสร้างแบบมีเงื่อนไขและวนซ้ำตามเวลาที่ระบุ",
          "โครงสร้างแบบเลือกทำทางเดียวโดยไม่รอเวลา",
          "โครงสร้างแบบเรียกซ้ำไม่มีจุดสิ้นสุดของระบบ"
        ],
        "correctIndex": 1,
        "explanation": "มีเงื่อนไขตรวจสอบการกดปุ่ม Snooze และหน่วงเวลาเตือนซ้ำตามระยะเวลา"
      },
      {
        "id": "u2_q10",
        "question": "ข้อมูลใดที่ \"ไม่จำเป็นต้องเก็บ\" ในแอปแจ้งเตือนการกินยา หากต้องการรักษาความเป็นส่วนตัวของผู้ใช้งาน?",
        "options": [
          "รหัสผ่านบัญชีธนาคารและข้อมูลการเงินของผู้ใช้",
          "ชื่อยาและช่วงเวลาที่แพทย์สั่งให้รับประทานยา",
          "ปริมาณยาที่ต้องกินในแต่ละมื้อ เช่น 1 เม็ดหลังอาหาร",
          "ข้อความแจ้งเตือนพิเศษ เช่น กินก่อนอาหาร 30 นาที"
        ],
        "correctIndex": 0,
        "explanation": "ข้อมูลบัญชีธนาคารไม่เกี่ยวข้องกับวัตถุประสงค์ของแอป และอาจก่อให้เกิดความเสี่ยงด้านความปลอดภัย"
      },
      {
        "id": "u2_q11",
        "question": "การทดสอบแอปแจ้งเตือนการกินยา โดยให้ผู้สูงอายุในชุมชนทดลองใช้งานจริงและประเมินความพึงพอใจ จัดเป็นการทดสอบระดับใด?",
        "options": [
          "การทดสอบระดับย่อย (Unit Testing)",
          "การทดสอบการเชื่อมต่อ (Integration Testing)",
          "การทดสอบความเร็ว (Performance Testing)",
          "การทดสอบการยอมรับของผู้ใช้ (User Acceptance Testing)"
        ],
        "correctIndex": 3,
        "explanation": "การให้ผู้ใช้งานจริงทดลองใช้ระบบและประเมินผลคือ User Acceptance Testing (UAT)"
      },
      {
        "id": "u2_q12",
        "question": "หากระบบแจ้งเตือนการกินยาทำงานผิดพลาด โดยไม่ส่งเสียงเตือนเมื่อถึงเวลาที่กำหนด ผู้พัฒนาควรทำสิ่งใดเป็นอันดับแรก?",
        "options": [
          "ปิดแอปพลิเคชันและยกเลิกการพัฒนาโครงงานทันที",
          "โพสต์ข้อความขอความช่วยเหลือบนสื่อสังคมออนไลน์",
          "ตรวจสอบโค้ดในส่วนของการตั้งเวลาเพื่อหาสาเหตุของบั๊ก",
          "ซื้อโทรศัพท์เครื่องใหม่มาทดสอบโดยไม่ดูโค้ดเดิม"
        ],
        "correctIndex": 2,
        "explanation": "การแก้ปัญหาที่ถูกต้องคือการตรวจสอบโค้ดเพื่อหาสาเหตุของข้อผิดพลาด (Debugging)"
      },
      {
        "id": "u2_q13",
        "question": "ในการพัฒนาโครงงานคอมพิวเตอร์ การนำรูปภาพหรือไอคอนจากอินเทอร์เน็ตมาใช้งานในแอปพลิเคชัน ควรคำนึงถึงสิ่งใดมากที่สุด?",
        "options": [
          "เลือกภาพที่มีขนาดไฟล์ใหญ่ที่สุดเพื่อความละเอียดสูง",
          "ดึงภาพจากเว็บไซต์ใดก็ได้โดยไม่ต้องขออนุญาตเจ้าของ",
          "นำภาพที่มีลายน้ำของผู้อื่นมาตัดส่วนลายน้ำทิ้งออกไป",
          "ตรวจสอบสัญญาอนุญาตสิทธิ์และให้เครดิตแหล่งที่มาถูกต้อง"
        ],
        "correctIndex": 3,
        "explanation": "ต้องเคารพลิขสิทธิ์และทรัพย์สินทางปัญญา โดยเลือกภาพที่อนุญาตให้ใช้และอ้างอิงแหล่งที่มาถูกต้อง"
      },
      {
        "id": "u2_q14",
        "question": "ขั้นตอนใดในวงจร SDLC ที่ผู้พัฒนาโครงงานต้องเริ่มเขียนโปรแกรม (Coding) ตามที่ได้ออกแบบไว้?",
        "options": [
          "ขั้นการวางแผน (Planning)",
          "ขั้นการพัฒนาและติดตั้ง (Implementation)",
          "ขั้นการวิเคราะห์ความต้องการ (Analysis)",
          "ขั้นการประเมินความเป็นไปได้ (Feasibility)"
        ],
        "correctIndex": 1,
        "explanation": "ขั้น Implementation เป็นขั้นตอนการลงมือเขียนโค้ดและพัฒนาโปรแกรมจริง"
      },
      {
        "id": "u2_q15",
        "question": "เครื่องมือใดช่วยให้นักเรียนสามารถนำเสนอขั้นตอนวิธีให้ผู้อื่นเข้าใจได้ง่ายก่อนลงมือเขียนโปรแกรมจริง?",
        "options": [
          "รหัสลำลอง (Pseudocode) และผังงาน (Flowchart)",
          "ตารางคำนวณสถิติและฐานข้อมูลความสัมพันธ์",
          "ภาพถ่ายหน้าจอโทรศัพท์จริงที่บันทึกไว้ล่วงหน้า",
          "เอกสารสัญญาจัดซื้อจัดจ้างอุปกรณ์คอมพิวเตอร์"
        ],
        "correctIndex": 0,
        "explanation": "รหัสลำลองและผังงานเป็นเครื่องมือมาตรฐานในการถ่ายทอดขั้นตอนวิธีอย่างเป็นสากล"
      },
      {
        "id": "u2_q16",
        "question": "ข้อใดเป็นตัวบ่งชี้ว่าโครงงานพัฒนาเว็บไซต์ห้องสมุดประสบความสำเร็จตามวัตถุประสงค์ที่ตั้งไว้?",
        "options": [
          "เว็บไซต์มีค่าใช้จ่ายในการจัดทำสูงกว่างบประมาณที่ตั้งไว้",
          "มีจำนวนหน้าเว็บเพจมากกว่า 100 หน้าขึ้นไปในระบบ",
          "นักเรียนค้นหาหนังสือได้สะดวกรวดเร็วและมีสถิติการใช้งานเพิ่มขึ้น",
          "เว็บไซต์ได้รับรางวัลชนะเลิศจากการประกวดภายนอกโรงเรียน"
        ],
        "correctIndex": 2,
        "explanation": "ความสำเร็จของโครงงานวัดจากการบรรลุวัตถุประสงค์ในการแก้ปัญหาของผู้ใช้จริง"
      },
      {
        "id": "u2_q17",
        "question": "การเก็บข้อมูลเวลาที่ผู้สูงอายุกดรับประทานยาจริง แล้วนำมาพล็อตเป็นกราฟความสม่ำเสมอในรายงาน จัดเป็นเนื้อหาในบทใด?",
        "options": [
          "บทที่ 2 เอกสารและทฤษฎีที่เกี่ยวข้อง",
          "บทที่ 4 ผลการดำเนินงานและการทดสอบ",
          "บทที่ 1 บทนำและความเป็นมาของปัญหา",
          "บทที่ 3 วิธีการดำเนินงานและการออกแบบ"
        ],
        "correctIndex": 1,
        "explanation": "ผลการทดสอบการใช้งานจริงและกราฟข้อมูลสรุปอยู่ในบทที่ 4 ผลการดำเนินงาน"
      },
      {
        "id": "u2_q18",
        "question": "หากต้องการเผยแพร่ผลงานโครงงานให้นักเรียนในโรงเรียนและชุมชนเข้าถึงได้สะดวกที่สุด ควรเลือกช่องทางใด?",
        "options": [
          "พิมพ์เอกสารแจกเฉพาะห้องพักครูเท่านั้น",
          "บันทึกไฟล์ลงในแฟลชไดรฟ์เก็บไว้ในตู้เก็บของ",
          "จัดพิมพ์เป็นหนังสือปกแข็งส่งเข้าห้องสมุด 1 เล่ม",
          "เผยแพร่ผ่านเว็บไซต์โรงเรียนและจัดนิทรรศการแสดงผลงาน"
        ],
        "correctIndex": 3,
        "explanation": "การเผยแพร่ผ่านเว็บไซต์และจัดแสดงผลงานช่วยให้ผู้สนใจเข้าถึงได้กว้างขวางและสะดวกที่สุด"
      },
      {
        "id": "u2_q19",
        "question": "ข้อใดเป็นข้อควรระวังด้านความปลอดภัยในการพัฒนาระบบที่มีการเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน?",
        "options": [
          "ไม่ควรจัดเก็บรหัสผ่านเป็นข้อความธรรมดาโดยไม่เข้ารหัส",
          "ควรกำหนดรหัสผ่านเริ่มต้นเป็น 1234 ให้ทุกคนใช้ร่วมกัน",
          "ควรแสดงรหัสผ่านบนหน้าจอให้เห็นชัดเจนตลอดเวลาที่พิมพ์",
          "อนุญาตให้ใครก็ได้แก้ไขข้อมูลผู้ใช้อื่นโดยไม่ต้องยืนยันตัวตน"
        ],
        "correctIndex": 0,
        "explanation": "รหัสผ่านต้องได้รับการแฮช (Hash) หรือเข้ารหัส เพื่อป้องกันการรั่วไหลของข้อมูลความลับ"
      },
      {
        "id": "u2_q20",
        "question": "ทักษะสำคัญที่สุดที่นักเรียนได้รับจากการลงมือทำโครงงานคอมพิวเตอร์ตามวงจร SDLC และแนวคิดเชิงคำนวณคือข้อใด?",
        "options": [
          "ทักษะการพิมพ์ดีดภาษาอังกฤษด้วยความเร็วสูงสุด",
          "ความสามารถในการจำคำสั่งและไวยากรณ์ภาษาโปรแกรม",
          "ทักษะการคิดแก้ปัญหาอย่างเป็นระบบและการทำงานเป็นทีม",
          "ความรู้เรื่องราคาและแหล่งจัดซื้ออุปกรณ์อิเล็กทรอนิกส์"
        ],
        "correctIndex": 2,
        "explanation": "เป้าหมายสูงสุดคือการพัฒนาทักษะการคิดแก้ปัญหาอย่างเป็นระบบและการทำงานร่วมกับผู้อื่นอย่างสร้างสรรค์"
      }
    ]
  },
  {
    "id": "quiz-midterm",
    "category": "midterm",
    "title": "ข้อสอบวัดผลการเรียนรู้กลางภาคเรียน: เทคโนโลยี (วิทยาการคำนวณ) ม.4 (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "midterm",
    "questions": [
      {
        "id": "mid_q1",
        "question": "หัวใจสำคัญของ \"แนวคิดเชิงคำนวณ (Computational Thinking)\" มุ่งเน้นไปที่สิ่งใดมากที่สุด?",
        "options": [
          "กระบวนการคิดแก้ปัญหาอย่างเป็นระบบและมีขั้นตอนชัดเจน",
          "ทักษะการจดจำไวยากรณ์คำสั่งของภาษาโปรแกรมคอมพิวเตอร์",
          "ความสามารถในการเลือกซื้อคอมพิวเตอร์ที่มีสมรรถนะสูง",
          "การฝึกใช้งานโปรแกรมสำเร็จรูปในสำนักงานให้เกิดความชำนาญ"
        ],
        "correctIndex": 0,
        "explanation": "แนวคิดเชิงคำนวณมุ่งเน้นการคิดวิเคราะห์อย่างเป็นระบบ มีตรรกะ เพื่อให้ได้ขั้นตอนวิธีที่แก้ปัญหาได้จริง"
      },
      {
        "id": "mid_q2",
        "question": "สถานการณ์ใดแสดงถึงการใช้ทักษะ \"การแยกส่วนประกอบและการย่อยปัญหา (Decomposition)\"?",
        "options": [
          "การเลือกเฉพาะใจความสำคัญของข่าวสารเพื่อเขียนสรุปย่อ",
          "การแจกแจงขั้นตอนการทำอาหารออกเป็นขั้นตอนเตรียมและปรุง",
          "การสังเกตเวลาที่แดดส่องกระทบห้องเรียนเป็นประจำทุกบ่าย",
          "การวาดภาพแผนผังเส้นทางโดยใช้สัญลักษณ์แทนสถานที่จริง"
        ],
        "correctIndex": 1,
        "explanation": "Decomposition คือการแตกกิจกรรมหรือปัญหาใหญ่ที่ซับซ้อนออกเป็นส่วนย่อยๆ เพื่อให้ง่ายต่อการลงมือทำ"
      },
      {
        "id": "mid_q3",
        "question": "นายสมชายสังเกตว่า ทุกวันจันทร์ช่วงเช้าจะมีผู้โดยสารรถประจำทางหนาแน่นกว่าปกติ จึงวางแผนออกเดินทางเร็วขึ้น การคิดของนายสมชายตรงกับองค์ประกอบใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การแยกส่วนประกอบ (Decomposition)",
          "การหารูปแบบ (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)"
        ],
        "correctIndex": 2,
        "explanation": "การสังเกตความถี่หรือแบบแผนของเหตุการณ์ที่เกิดขึ้นซ้ำๆ ในแต่ละสัปดาห์คือ Pattern Recognition"
      },
      {
        "id": "mid_q4",
        "question": "ในการสร้างแอปพลิเคชันแนะนำสถานที่ท่องเที่ยว ข้อมูลใดควร \"ตัดทิ้ง\" ตามหลักการคิดเชิงนามธรรม (Abstraction)?",
        "options": [
          "เวลาเปิดทำการและราคาบัตรเข้าชมของสถานที่",
          "ตำแหน่งพิกัดบนแผนที่และเบอร์ติดต่อสอบถาม",
          "ภาพถ่ายจุดแลนด์มาร์กสำคัญของสถานที่ท่องเที่ยว",
          "ยี่ห้อของกล้องที่ใช้ถ่ายภาพสถานที่ท่องเที่ยวนั้น"
        ],
        "correctIndex": 3,
        "explanation": "ยี่ห้อกล้องที่ถ่ายภาพเป็นรายละเอียดที่ไม่จำเป็นต่อการนำทางหรือการท่องเที่ยว จึงควรตัดทิ้งตามหลัก Abstraction"
      },
      {
        "id": "mid_q5",
        "question": "ข้อใดเป็นคุณสมบัติที่จำเป็นของ \"ขั้นตอนวิธี (Algorithm)\" ที่มีประสิทธิภาพ?",
        "options": [
          "มีลำดับขั้นตอนการทำงานที่ชัดเจนและให้ผลลัพธ์ถูกต้องเสมอ",
          "ใช้คำสั่งที่ซับซ้อนเพื่อให้ระบบคอมพิวเตอร์ทำงานได้หลายงาน",
          "มีจำนวนขั้นตอนการทำงานให้น้อยที่สุดโดยไม่ต้องตรวจความถูกต้อง",
          "เขียนเป็นภาษาเครื่องโดยตรงเพื่อเพิ่มความเร็วในการประมวลผล"
        ],
        "correctIndex": 0,
        "explanation": "ขั้นตอนวิธีที่ดีต้องมีความชัดเจน ไม่กำกวม มีจุดเริ่มต้นและจุดสิ้นสุด และให้ผลลัพธ์ที่ถูกต้องเมื่อปฏิบัติตาม"
      },
      {
        "id": "mid_q6",
        "question": "สัญลักษณ์ผังงาน (Flowchart) รูป \"สี่เหลี่ยมด้านขนาน (Parallelogram)\" ใช้แทนความหมายใด?",
        "options": [
          "การประมวลผลหรือคำนวณข้อมูลทางคณิตศาสตร์",
          "การรับเข้าหรือแสดงผลข้อมูลทั่วไปของระบบ",
          "การตรวจสอบเงื่อนไขเพื่อตัดสินใจทิศทาง",
          "จุดเริ่มต้นหรือจุดสิ้นสุดการทำงานของผังงาน"
        ],
        "correctIndex": 1,
        "explanation": "สัญลักษณ์สี่เหลี่ยมด้านขนานใช้สำหรับการรับข้อมูลเข้า (Input) หรือแสดงผลข้อมูล (Output) โดยไม่ระบุอุปกรณ์เฉพาะเจาะจง"
      },
      {
        "id": "mid_q7",
        "question": "หากต้องการตรวจสอบว่า \"คะแนนสอบวิชาคณิตศาสตร์มากกว่าหรือเท่ากับ 50 คะแนนหรือไม่\" ควรใช้สัญลักษณ์ใดในผังงาน?",
        "options": [
          "สี่เหลี่ยมผืนผ้า (Process) สำหรับคำนวณ",
          "วงรีหรือสี่เหลี่ยมมุมมน (Terminator) สำหรับเริ่มต้น",
          "สี่เหลี่ยมขนมเปียกปูน (Decision) สำหรับตรวจสอบเงื่อนไข",
          "สี่เหลี่ยมด้านขนาน (Data Input/Output) สำหรับรับข้อมูล"
        ],
        "correctIndex": 2,
        "explanation": "การเปรียบเทียบเงื่อนไข (>= 50) ต้องใช้สัญลักษณ์การตัดสินใจ (Decision) ซึ่งมีรูปทรงสี่เหลี่ยมขนมเปียกปูน"
      },
      {
        "id": "mid_q8",
        "question": "โครงสร้างการทำงานของผังงานในข้อใด มีลักษณะการทำงานแบบ \"เลือกทำ (Selection)\"?",
        "options": [
          "การบวกตัวเลข 3 จำนวนเรียงกันจากตัวแรกถึงตัวสุดท้าย",
          "การพิมพ์ใบเสร็จรับเงินจำนวน 100 ใบติดต่อกันจนหมด",
          "การคำนวณหาค่าเฉลี่ยของคะแนนนักเรียนทั้งห้องเรียน",
          "การตรวจสอบคะแนนเพื่อตัดสินผลการสอบว่าผ่านหรือไม่ผ่าน"
        ],
        "correctIndex": 3,
        "explanation": "การตรวจคะแนนเพื่อเลือกทำว่าจะแสดงคำว่า 'ผ่าน' หรือ 'ไม่ผ่าน' เป็นโครงสร้างแบบเลือกทำ (Selection)"
      },
      {
        "id": "mid_q9",
        "question": "วงจรการพัฒนาระบบ SDLC 5 ขั้นตอน มีลำดับการทำงานที่ถูกต้องตามข้อใด?",
        "options": [
          "การวางแผน -> การวิเคราะห์ -> การออกแบบ -> การพัฒนา -> การบำรุงรักษา",
          "การวิเคราะห์ -> การวางแผน -> การออกแบบ -> การพัฒนา -> การบำรุงรักษา",
          "การวางแผน -> การออกแบบ -> การพัฒนา -> การวิเคราะห์ -> การบำรุงรักษา",
          "การออกแบบ -> การวิเคราะห์ -> การวางแผน -> การพัฒนา -> การบำรุงรักษา"
        ],
        "correctIndex": 0,
        "explanation": "ลำดับขั้นตอนมาตรฐานของวงจร SDLC คือ: 1.การวางแผน 2.การวิเคราะห์ 3.การออกแบบ 4.การพัฒนาและติดตั้ง 5.การบำรุงรักษา"
      },
      {
        "id": "mid_q10",
        "question": "การกำหนดเป้าหมาย ขอบเขตงาน และการศึกษาความเป็นไปได้ของโครงงาน จัดอยู่ในขั้นตอนใดของ SDLC?",
        "options": [
          "ขั้นตอนการวิเคราะห์ระบบ (Analysis)",
          "ขั้นตอนการวางแผนโครงงาน (Planning)",
          "ขั้นตอนการออกแบบระบบ (Design)",
          "ขั้นตอนการพัฒนาโปรแกรม (Implementation)"
        ],
        "correctIndex": 1,
        "explanation": "ขั้นตอนการวางแผน (Planning) มุ่งเน้นการกำหนดวัตถุประสงค์ ขอบเขต และศึกษาความเป็นไปได้ก่อนเริ่มดำเนินงาน"
      },
      {
        "id": "mid_q11",
        "question": "แผนภูมิแกนต์ (Gantt Chart) มีประโยชน์ต่อการบริหารจัดการโครงงานอย่างไรมากที่สุด?",
        "options": [
          "ช่วยจัดเก็บข้อมูลผลการทดสอบการใช้งานจริงของผู้ใช้",
          "ช่วยคำนวณงบประมาณค่าใช้จ่ายของโครงงานโดยอัตโนมัติ",
          "ช่วยควบคุมและติดตามระยะเวลาการดำเนินงานแต่ละกิจกรรม",
          "ช่วยออกแบบหน้าจอส่วนติดต่อผู้ใช้งานให้สวยงามทันสมัย"
        ],
        "correctIndex": 2,
        "explanation": "แผนภูมิแกนต์ใช้สำหรับวางแผน กำหนดกรอบเวลา และติดตามความก้าวหน้าของกิจกรรมต่างๆ ในโครงงาน"
      },
      {
        "id": "mid_q12",
        "question": "การสัมภาษณ์กลุ่มผู้ใช้งานเพื่อค้นหาปัญหาและความต้องการของระบบ จัดอยู่ในขั้นตอนใดของวงจร SDLC?",
        "options": [
          "การบำรุงรักษาระบบ (Maintenance)",
          "การติดตั้งและส่งมอบงาน (Implementation)",
          "การออกแบบสถาปัตยกรรม (Design)",
          "การวิเคราะห์ความต้องการ (Analysis)"
        ],
        "correctIndex": 3,
        "explanation": "การเก็บรวบรวมและวิเคราะห์ความต้องการของผู้ใช้ (Requirement Gathering) จัดอยู่ในขั้นตอนการวิเคราะห์ระบบ (Analysis)"
      },
      {
        "id": "mid_q13",
        "question": "แผนภาพกระแสข้อมูล (Data Flow Diagram - DFD) ใช้สำหรับอธิบายสิ่งใดในระบบโครงงาน?",
        "options": [
          "การไหลและการประมวลผลข้อมูลระหว่างผู้ใช้งานกับระบบ",
          "แผนผังเครือข่ายและการจัดวางเครื่องคอมพิวเตอร์แม่ข่าย",
          "ลำดับการเรียกใช้ฟังก์ชันและตัวแปรในภาษาคอมพิวเตอร์",
          "ขั้นตอนการประกอบชิ้นส่วนอุปกรณ์อิเล็กทรอนิกส์ในระบบ"
        ],
        "correctIndex": 0,
        "explanation": "DFD ใช้สำหรับแสดงการไหลของข้อมูล (Data Flow) กระบวนการประมวลผล และแหล่งจัดเก็บข้อมูลในระบบ"
      },
      {
        "id": "mid_q14",
        "question": "การร่างแบบจำลองหน้าจอเว็บไซต์หรือแอปพลิเคชัน (Wireframe) จัดอยู่ในขั้นตอนใดของวงจร SDLC?",
        "options": [
          "ขั้นตอนการวางแผน (Planning)",
          "ขั้นตอนการออกแบบ (Design)",
          "ขั้นตอนการวิเคราะห์ (Analysis)",
          "ขั้นตอนการติดตั้ง (Implementation)"
        ],
        "correctIndex": 1,
        "explanation": "การออกแบบส่วนติดต่อผู้ใช้งาน (UI Design) และ Wireframe จัดอยู่ในขั้นตอนการออกแบบ (Design)"
      },
      {
        "id": "mid_q15",
        "question": "การทดสอบโปรแกรมโดยผู้พัฒนาทดสอบทีละโมดูลย่อยๆ เพื่อยืนยันความถูกต้องก่อนนำมารวมกัน เรียกว่าอะไร?",
        "options": [
          "การทดสอบการยอมรับ (Acceptance Testing)",
          "การทดสอบการเชื่อมต่อ (Integration Testing)",
          "การทดสอบระดับหน่วยย่อย (Unit Testing)",
          "การทดสอบระบบภาพรวม (System Testing)"
        ],
        "correctIndex": 2,
        "explanation": "Unit Testing คือการทดสอบฟังก์ชันหรือโมดูลเดี่ยวๆ แต่ละส่วนอย่างละเอียด"
      },
      {
        "id": "mid_q16",
        "question": "เมื่อส่งมอบระบบให้ผู้ใช้งานจริงแล้ว แต่พบข้อผิดพลาดที่ต้องแก้ไขภายหลัง กิจกรรมนี้จัดอยู่ในขั้นตอนใด?",
        "options": [
          "ขั้นตอนการออกแบบ (Design)",
          "ขั้นตอนการวางแผน (Planning)",
          "ขั้นตอนการพัฒนา (Implementation)",
          "ขั้นตอนการบำรุงรักษา (Maintenance)"
        ],
        "correctIndex": 3,
        "explanation": "การแก้ไขข้อผิดพลาดหลังเริ่มใช้งานจริงและการปรับปรุงระบบเป็นกิจกรรมในขั้นตอนการบำรุงรักษา (Maintenance)"
      },
      {
        "id": "mid_q17",
        "question": "ในการศึกษาความเป็นไปได้ (Feasibility Study) การพิจารณาเรื่องงบประมาณและผลตอบแทนที่ได้รับ ตรงกับด้านใด?",
        "options": [
          "ด้านเศรษฐศาสตร์ (Economic Feasibility)",
          "ด้านเทคนิคและอุปกรณ์ (Technical Feasibility)",
          "ด้านการดำเนินงาน (Operational Feasibility)",
          "ด้านกฎหมายและลิขสิทธิ์ (Legal Feasibility)"
        ],
        "correctIndex": 0,
        "explanation": "Economic Feasibility พิจารณาความคุ้มค่าด้านงบประมาณ ต้นทุน และผลตอบแทนของโครงงาน"
      },
      {
        "id": "mid_q18",
        "question": "ในการเขียนรายงานโครงงานคอมพิวเตอร์ 5 บท ส่วนของ \"วัตถุประสงค์และขอบเขตของโครงงาน\" บรรจุอยู่ในบทใด?",
        "options": [
          "บทที่ 2 เอกสารที่เกี่ยวข้อง",
          "บทที่ 1 บทนำของโครงงาน",
          "บทที่ 3 วิธีการดำเนินงาน",
          "บทที่ 4 ผลการดำเนินงาน"
        ],
        "correctIndex": 1,
        "explanation": "วัตถุประสงค์ ขอบเขต และประโยชน์ที่คาดว่าจะได้รับ บันทึกอยู่ในบทที่ 1 บทนำ"
      },
      {
        "id": "mid_q19",
        "question": "การอธิบายขั้นตอนการพัฒนาโปรแกรม ซอฟต์แวร์ที่ใช้ และเครื่องมือที่ใช้ในการทำโครงงาน จัดอยู่ในบทใดของรายงาน?",
        "options": [
          "บทที่ 1 บทนำของโครงงาน",
          "บทที่ 2 ทฤษฎีที่เกี่ยวข้อง",
          "บทที่ 3 วิธีการดำเนินงาน",
          "บทที่ 5 สรุปและข้อเสนอแนะ"
        ],
        "correctIndex": 2,
        "explanation": "บทที่ 3 วิธีการดำเนินงานโครงงาน อธิบายขั้นตอนและเครื่องมือที่ใช้ในการพัฒนาอย่างละเอียด"
      },
      {
        "id": "mid_q20",
        "question": "ส่วนประกอบใดในเล่มรายงานโครงงานที่ทำหน้าที่สรุปภาพรวมของโครงงานทั้งหมดให้อ่านจบใน 1 หน้ากระดาษ?",
        "options": [
          "กิตติกรรมประกาศ (Acknowledgement)",
          "สารบัญเนื้อหา (Table of Contents)",
          "บรรณานุกรม (Bibliography)",
          "บทคัดย่อ (Abstract)"
        ],
        "correctIndex": 3,
        "explanation": "บทคัดย่อ (Abstract) สรุปภาพรวมของปัญหา วัตถุประสงค์ วิธีการดำเนินงาน และผลลัพธ์ของโครงงานแบบย่อ"
      }
    ]
  },
  {
    "id": "quiz-final",
    "category": "final",
    "title": "ข้อสอบวัดผลการเรียนรู้ปลายภาคเรียน: เทคโนโลยี (วิทยาการคำนวณ) ม.4 (20 ข้อ)",
    "timeLimitMinutes": 30,
    "passcode": "final",
    "questions": [
      {
        "id": "fin_q1",
        "question": "ในกรณีศึกษาโครงงานเว็บไซต์ห้องสมุดโรงเรียน ข้อใดเป็นปัญหาหลักที่ตรวจพบจากการสำรวจผู้ใช้งานจริง?",
        "options": [
          "คอมพิวเตอร์ในห้องสมุดมีขนาดหน้าจอใหญ่เกินไป",
          "เจ้าหน้าที่ห้องสมุดมีจำนวนมากกว่าผู้เข้ามาใช้บริการ",
          "นักเรียนค้นหาหนังสือไม่พบและไม่ทราบสถานะการยืมคืน",
          "มีโต๊ะเก้าอี้สำหรับอ่านหนังสือไม่เพียงพอในห้องสมุด"
        ],
        "correctIndex": 2,
        "explanation": "ปัญหาหลักคือความยากลำบากในการค้นหาหนังสือและไม่ทราบว่าหนังสือว่างอยู่หรือไม่"
      },
      {
        "id": "fin_q2",
        "question": "การที่ผู้พัฒนาแบ่งระบบเว็บไซต์ห้องสมุดออกเป็น ระบบค้นหา ระบบยืมคืน และระบบสมาชิก จัดเป็นการใช้ทักษะใด?",
        "options": [
          "การคิดเชิงนามธรรม (Abstraction)",
          "การหารูปแบบพฤติกรรม (Pattern Recognition)",
          "การออกแบบขั้นตอนวิธี (Algorithm Design)",
          "การแยกส่วนประกอบ (Decomposition)"
        ],
        "correctIndex": 3,
        "explanation": "การแบ่งระบบใหญ่เป็นระบบย่อยๆ เป็นการประยุกต์ใช้ Decomposition"
      },
      {
        "id": "fin_q3",
        "question": "หากต้องการออกแบบระบบค้นหาหนังสือห้องสมุดให้แสดงผลตามตัวอักษร ก ถึง ฮ ควรใช้ขั้นตอนวิธีในข้อใด?",
        "options": [
          "ขั้นตอนวิธีแบบเรียงลำดับข้อมูล (Sorting Algorithm)",
          "ขั้นตอนวิธีแบบเลือกสุ่มรายการ (Random Algorithm)",
          "ขั้นตอนวิธีแบบย้อนรอยกลับ (Backtracking Algorithm)",
          "ขั้นตอนวิธีแบบแบ่งแยกข้อมูล (Divide & Conquer)"
        ],
        "correctIndex": 0,
        "explanation": "การเรียงลำดับข้อมูลตามตัวอักษรเป็น Sorting Algorithm"
      },
      {
        "id": "fin_q4",
        "question": "ในการสร้างแผนภาพกระแสข้อมูล (DFD) ของระบบห้องสมุด สัญลักษณ์ \"ลูกศร (Data Flow)\" ใช้แสดงสิ่งใด?",
        "options": [
          "การตัดสินใจเลือกฟังก์ชันการทำงานของระบบ",
          "ทิศทางการเคลื่อนย้ายหรือการไหลของข้อมูลในระบบ",
          "แหล่งจัดเก็บข้อมูลหรือตารางข้อมูลในเซิร์ฟเวอร์",
          "ขอบเขตทางกายภาพของสถานที่ติดตั้งคอมพิวเตอร์"
        ],
        "correctIndex": 1,
        "explanation": "ลูกศรแสดงทิศทางการไหลของข้อมูลจากจุดหนึ่งไปยังอีกจุดหนึ่งในระบบ"
      },
      {
        "id": "fin_q5",
        "question": "การออกแบบส่วนติดต่อผู้ใช้งาน (UI) ของเว็บไซต์ห้องสมุด ข้อใดเป็นแนวทางที่เหมาะสมที่สุดสำหรับนักเรียน?",
        "options": [
          "ใช้ภาพพื้นหลังเคลื่อนไหวและมีเอฟเฟกต์เสียงตลอดเวลา",
          "ซ่อนเมนูค้นหาไว้ในหน้าต่างย่อยเพื่อความเรียบง่าย",
          "มีช่องค้นหาที่มองเห็นชัดเจนและเมนูใช้งานเข้าใจง่าย",
          "ใช้ฟอนต์ประดิษฐ์ที่มีลวดลายซับซ้อนหลายสิบรูปแบบ"
        ],
        "correctIndex": 2,
        "explanation": "UI ที่ดีต้องใช้งานง่าย ค้นหาข้อมูลได้สะดวก และไม่ซับซ้อน"
      },
      {
        "id": "fin_q6",
        "question": "ในกรณีศึกษาแอปแจ้งเตือนการกินยาสำหรับผู้สูงอายุ ข้อใดคือปัญหาหลักด้านสุขภาพของผู้สูงอายุที่ต้องแก้?",
        "options": [
          "การลืมรับประทานยาตรงเวลาและสายตามองตัวหนังสือเล็กไม่ชัด",
          "ความต้องการเล่นเกมฝึกสมองเพื่อแข่งขันกับเพื่อนร่วมรุ่น",
          "การเชื่อมต่อแอปพลิเคชันเข้ากับอุปกรณ์เครือข่ายความเร็วสูง",
          "ความยากลำบากในการเดินทางไปซื้อสมาร์ตโฟนเครื่องใหม่"
        ],
        "correctIndex": 0,
        "explanation": "ผู้สูงอายุมีปัญหาสายตายาวและมักลืมเวลาทานยาเป็นประจำ"
      },
      {
        "id": "fin_q7",
        "question": "หลักการออกแบบหน้าจอแอปพลิเคชันให้เหมาะสมกับผู้สูงอายุ (Elderly-Friendly Design) คือข้อใด?",
        "options": [
          "ใช้ข้อความภาษาอังกฤษตัวเขียนเพื่อให้ดูทันสมัย",
          "ใส่ปุ่มกดจำนวนมากในหน้าเดียวกันเพื่อความครบครัน",
          "ลดขนาดตัวอักษรลงเพื่อแสดงข้อมูลได้จำนวนมากที่สุด",
          "ใช้ตัวอักษรขนาดใหญ่ สีสันตัดกันชัดเจน และมีปุ่มกดใหญ่"
        ],
        "correctIndex": 3,
        "explanation": "การออกแบบสำหรับผู้สูงอายุต้องใช้ตัวอักษรขนาดใหญ่ สีคอนทราสต์ชัดเจน และปุ่มกดสัมผัสง่าย"
      },
      {
        "id": "fin_q8",
        "question": "เงื่อนไขในแอปเตือนยา: \"หากผู้ใช้กดปุ่ม เลื่อนเตือน (Snooze) ให้ระบบรอ 10 นาทีแล้วส่งเสียงเตือนซ้ำ\" จัดเป็นโครงสร้างแบบใด?",
        "options": [
          "โครงสร้างการทำงานแบบเรียงลำดับเส้นตรงต่อเนื่อง",
          "โครงสร้างการทำงานแบบมีเงื่อนไขและวนซ้ำตามเวลา",
          "โครงสร้างการทำงานแบบไม่มีจุดสิ้นสุดของโปรแกรม",
          "โครงสร้างการทำงานแบบสุ่มเลือกการทำงานอัตโนมัติ"
        ],
        "correctIndex": 1,
        "explanation": "มีการตรวจสอบเงื่อนไขการกดปุ่ม Snooze และวนซ้ำรอเวลาส่งเสียงเตือนใหม่"
      },
      {
        "id": "fin_q9",
        "question": "ในการเก็บข้อมูลผู้ป่วยเพื่อใช้ในแอปแจ้งเตือนการกินยา ข้อใดเป็นข้อมูลที่ \"ไม่จำเป็นต้องจัดเก็บ\"?",
        "options": [
          "ข้อมูลชื่อยาและเวลาที่แพทย์สั่งให้รับประทาน",
          "ข้อควรระวังพิเศษ เช่น ทานก่อนอาหารหรือหลังอาหาร",
          "รหัสผ่านบัญชีเงินฝากธนาคารและประวัติทางการเงิน",
          "ปริมาณยาที่ต้องรับประทานในแต่ละมื้ออย่างถูกต้อง"
        ],
        "correctIndex": 2,
        "explanation": "ข้อมูลบัญชีธนาคารไม่จำเป็นและอาจก่อให้เกิดความเสี่ยงต่อความเป็นส่วนตัว"
      },
      {
        "id": "fin_q10",
        "question": "การทดสอบแอปเตือนยากับผู้สูงอายุในชุมชนเพื่อประเมินความพึงพอใจและความสะดวกในการใช้งาน เรียกว่าอะไร?",
        "options": [
          "การทดสอบระดับย่อย (Unit Testing)",
          "การทดสอบการยอมรับของผู้ใช้ (User Acceptance Testing)",
          "การทดสอบความเร็วระบบ (Performance Testing)",
          "การทดสอบความปลอดภัย (Security Testing)"
        ],
        "correctIndex": 1,
        "explanation": "User Acceptance Testing (UAT) คือการนำระบบไปให้กลุ่มผู้ใช้เป้าหมายทดลองใช้งานจริง"
      },
      {
        "id": "fin_q11",
        "question": "เมื่อโปรแกรมเกิดข้อผิดพลาด (Bug) ทำให้ระบบทำงานผิดพลาด ขั้นตอนที่ถูกต้องในการแก้ปัญหาคือข้อใด?",
        "options": [
          "ตรวจสอบโค้ด หาสาเหตุ แล้วแก้ไขข้อผิดพลาด (Debug)",
          "ปิดโปรแกรมและเริ่มต้นทำโครงงานเรื่องใหม่ทันที",
          "ส่งมอบโปรแกรมให้ผู้ใช้งานโดยไม่ต้องแจ้งข้อผิดพลาด",
          "เปลี่ยนระบบปฏิบัติการของเครื่องคอมพิวเตอร์ใหม่"
        ],
        "correctIndex": 0,
        "explanation": "Debugging เป็นกระบวนการมาตรฐานในการระบุและแก้ไขข้อผิดพลาดของซอฟต์แวร์"
      },
      {
        "id": "fin_q12",
        "question": "ในในการนำภาพไอคอนหรือภาพประกอบจากอินเทอร์เน็ตมาใช้ในโครงงาน ควรคำนึงถึงสิ่งใดมากที่สุด?",
        "options": [
          "เลือกดาวน์โหลดเฉพาะภาพที่มีขนาดไฟล์ใหญ่ที่สุด",
          "บันทึกภาพจากเว็บไซต์ใดก็ได้โดยไม่ต้องขออนุญาต",
          "ตัดลายน้ำของเจ้าของภาพออกก่อนนำมาใส่ในโครงงาน",
          "ตรวจสอบสัญญาอนุญาตสิทธิ์และระบุแหล่งที่มาอ้างอิง"
        ],
        "correctIndex": 3,
        "explanation": "ต้องเคารพทรัพย์สินทางปัญญาและเลือกใช้งานภาพที่ได้รับอนุญาตพร้อมอ้างอิงแหล่งที่มา"
      },
      {
        "id": "fin_q13",
        "question": "สัญลักษณ์สัญญาอนุญาตครีเอทีฟคอมมอนส์แบบ \"CC-BY\" มีความหมายตรงกับข้อใด?",
        "options": [
          "ห้ามนำผลงานไปใช้ในเชิงพาณิชย์ทุกกรณี",
          "อนุญาตให้นำผลงานไปใช้ได้แต่ต้องระบุที่มา",
          "ไม่อนุญาตให้ทำการดัดแปลงผลงานต้นฉบับ",
          "ต้องเผยแพร่ผลงานที่ดัดแปลงด้วยเงื่อนไขเดิม"
        ],
        "correctIndex": 1,
        "explanation": "CC-BY กำหนดให้แสดงที่มาของเจ้าของผลงานต้นฉบับเมื่อนำไปใช้"
      },
      {
        "id": "fin_q14",
        "question": "การรวบรวมสถิติการใช้งานเว็บไซต์ห้องสมุดจริงตลอด 1 เดือน แล้วนำมาสรุปเป็นแผนภูมิ ควรเขียนไว้ในบทใด?",
        "options": [
          "บทที่ 2 เอกสารและงานวิจัยที่เกี่ยวข้อง",
          "บทที่ 3 วิธีการดำเนินงานและการทดลอง",
          "บทที่ 4 ผลการดำเนินงานและการวิเคราะห์",
          "บทที่ 1 บทนำและความเป็นมาของปัญหา"
        ],
        "correctIndex": 2,
        "explanation": "ข้อมูลสถิติผลการใช้งานจริงและการวิเคราะห์ผลอยู่ในบทที่ 4 ผลการดำเนินงาน"
      },
      {
        "id": "fin_q15",
        "question": "ในรายงานโครงงานคอมพิวเตอร์ 5 บท หัวข้อ \"ปัญหา อุปสรรค และข้อเสนอแนะในการพัฒนาต่อ\" บรรจุอยู่ในบทใด?",
        "options": [
          "บทที่ 5 สรุปผล อภิปรายผล และข้อเสนอแนะ",
          "บทที่ 4 ผลการดำเนินงานและการทดสอบระบบ",
          "บทที่ 3 วิธีการดำเนินงานและขั้นตอนพัฒนา",
          "บทที่ 2 ทฤษฎีและงานวิจัยที่นำมาอ้างอิง"
        ],
        "correctIndex": 0,
        "explanation": "ข้อสรุป ปัญหาอุปสรรค และข้อเสนอแนะการพัฒนาต่อยอดจัดอยู่ในบทที่ 5"
      },
      {
        "id": "fin_q16",
        "question": "การเตรียมตัวนำเสนอโครงงานคอมพิวเตอร์หน้าชั้นเรียน ข้อใดเป็นแนวทางที่เหมาะสมที่สุด?",
        "options": [
          "ท่องจำโค้ดโปรแกรมทั้งหมดมาพูดให้ผู้ฟังฟัง",
          "ยืนอ่านเอกสารรายงานอย่างละเอียดทีละหน้ากระดาษ",
          "แสดงเฉพาะภาพกราฟิกสวยงามโดยไม่ต้องอธิบายระบบ",
          "สรุปประเด็นสำคัญ กระชับ และสาธิตการทำงานจริง"
        ],
        "correctIndex": 3,
        "explanation": "การนำเสนอที่มีประสิทธิภาพต้องกระชับ ตรงประเด็น และสาธิตผลงานให้เห็นการทำงานจริง"
      },
      {
        "id": "fin_q17",
        "question": "ข้อใดเป็นตัวบ่งชี้สำคัญที่สุดว่า \"โครงงานแอปแจ้งเตือนการกินยา\" ประสบความสำเร็จตามเป้าหมาย?",
        "options": [
          "แอปพลิเคชันมีขนาดไฟล์ติดตั้งมากกว่า 500 เมกะไบต์",
          "ผู้สูงอายุรับประทานยาตรงเวลามากขึ้นและลืมกินยาลดลง",
          "โค้ดของโปรแกรมมีความยาวมากกว่า 10,000 บรรทัด",
          "ได้รับคะแนนเต็มในการสอบวิชาการเขียนโปรแกรม"
        ],
        "correctIndex": 1,
        "explanation": "เป้าหมายหลักคือการแก้ปัญหาของผู้ใช้ ซึ่งก็คือการช่วยให้ผู้สูงอายุไม่ลืมรับประทานยา"
      },
      {
        "id": "fin_q18",
        "question": "ข้อใดเป็นแนวทางป้องกันความปลอดภัยของข้อมูลผู้ใช้งานในระบบโครงงานเว็บไซต์?",
        "options": [
          "จัดเก็บรหัสผ่านเป็นข้อความธรรมดาเพื่อให้ผู้ดูแลดูได้ง่าย",
          "อนุญาตให้ผู้ใช้ทุกคนสามารถแก้ไขข้อมูลของเพื่อนได้",
          "เข้ารหัสผ่านของผู้ใช้และกำหนดสิทธิ์การเข้าถึงข้อมูล",
          "ไม่ต้องติดตั้งระบบล็อกอินเพื่อความสะดวกในการเข้าใช้งาน"
        ],
        "correctIndex": 2,
        "explanation": "การเข้ารหัสผ่าน (Hashing) และการจำกัดสิทธิ์ผู้ใช้เป็นมาตรการพื้นฐานด้านความปลอดภัย"
      },
      {
        "id": "fin_q19",
        "question": "การดูแลระบบหลังส่งมอบงาน เช่น การปรับปรุงให้รองรับระบบปฏิบัติการรุ่นใหม่ จัดอยู่ในขั้นตอนใดของ SDLC?",
        "options": [
          "ขั้นตอนการบำรุงรักษา (Maintenance)",
          "ขั้นตอนการวางแผนโครงงาน (Planning)",
          "ขั้นตอนการออกแบบระบบ (Design)",
          "ขั้นตอนการวิเคราะห์ระบบ (Analysis)"
        ],
        "correctIndex": 0,
        "explanation": "การดูแล ปรับปรุง และอัปเดตระบบหลังส่งมอบอยู่ในขั้นตอนการบำรุงรักษา (Maintenance)"
      },
      {
        "id": "fin_q20",
        "question": "ประโยชน์สูงสุดที่นักเรียนได้รับจากการทำโครงงานคอมพิวเตอร์บูรณาการแนวคิดเชิงคำนวณคือข้อใด?",
        "options": [
          "ความสามารถในการเล่นเกมคอมพิวเตอร์ได้เก่งขึ้น",
          "ทักษะการจำหน่ายอุปกรณ์คอมพิวเตอร์ในราคาประหยัด",
          "การได้รับเกียรติบัตรและของรางวัลจากการแข่งขัน",
          "ทักษะการคิดแก้ปัญหาในชีวิตจริงและการทำงานเป็นทีม"
        ],
        "correctIndex": 3,
        "explanation": "เป้าหมายการเรียนรู้สูงสุดคือทักษะการคิดวิเคราะห์แก้ปัญหาในโลกความจริงและการทำงานร่วมกับผู้อื่น"
      }
    ]
  }
],

    quiz_attempts: [
      {
        id: 'att-1',
        quiz_id: 'quiz-unit1',
        student_id: 'u-student1',
        student_name: 'นายณัฐวุฒิ เรียนดี',
        score: 5,
        maxScore: 5,
        submitted_at: '2026-09-16T10:00:00.000Z'
      }
    ],

    announcements: [
      {
        id: 'anc-1',
        title: '🚀 ยินดีต้อนรับสู่ศูนย์เรียนรู้วิทยาการคำนวณ ม.4 (Full-Stack Next-Gen)',
        content: 'เรียนรู้ผ่านสื่อมัลติมีเดีย บทเรียน วิดีโอสอน สไลด์พรีเซนเตชัน E-Book หนังสือเรียน แบบทดสอบย่อย และข้อสอบกลางภาค/ปลายภาค พร้อมบันทึกผลลง Supabase เรียลไทม์!',
        author: 'ครูปณิฏฐา บุญยงค์',
        date: '2026-09-18'
      },
      {
        id: 'anc-2',
        title: '📌 กำหนดการสอบกลางภาคและยื่นเค้าโครงโครงงาน 5 บท',
        content: 'ให้นักเรียน ม.4 ทำแบบทดสอบกลางภาค และยื่นเค้าโครงโครงงาน 5 บทผ่านเมนู "ส่งงาน" ภายในวันที่ 15 ตุลาคม 2026',
        author: 'ครูปณิฏฐา บุญยงค์',
        date: '2026-09-18'
      }
    ],

    worksheets: [
  {
    "id": "ws-1-1",
    "unit_id": "mod-1",
    "unit": "หน่วยการเรียนรู้ที่ 1",
    "code": "ใบงานที่ 1.1",
    "title": "ใบงานที่ 1.1: เรื่อง การประยุกต์ใช้แนวคิดเชิงคำนวณในการแก้ปัญหาบริบทจริง",
    "subtitle": "การประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณเพื่อแก้ปัญหาในชีวิตประจำวัน",
    "plan": "แผนการจัดการเรียนรู้ที่ 1: แนวคิดเชิงคำนวณกับการแก้ปัญหา",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-10-15",
    "asg_id": "asg-1",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนศึกษาสถานการณ์ปัญหาที่กำหนด แล้ววิเคราะห์แก้ปัญหาโดยประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณ (Computational Thinking) ให้ครบถ้วน ชัดเจน และสมเหตุสมผลตามหลักวิชาการ",
    "scenario": "ตะวัน ขับรถยนต์ออกไปทำงานในตอนเช้า แต่พบว่ารถยนต์ของตนเองไม่สามารถเดินทางต่อไปถึงที่ทำงานได้ ซึ่งตะวันคิดว่าปัญหาอาจมีสาเหตุมาจาก 2 ประเด็น ได้แก่ ยางแบน หรือน้ำมันรถยนต์ใกล้จะหมด จากประสบการณ์ของตะวัน ในแต่ละครั้งที่รถยนต์มีปัญหา จะต้องจัดการกับยางรถยนต์ที่แบนก่อนเป็นอันดับแรก ซึ่งรถยนต์ยังพอมีน้ำมันเหลืออยู่ ให้นักเรียนช่วยตะวันวิเคราะห์ปัญหาและออกแบบขั้นตอนการแก้ปัญหาโดยประยุกต์ใช้ 4 องค์ประกอบของแนวคิดเชิงคำนวณ",
    "tasks": [
      {
        "step": 1,
        "title": "1. การแยกส่วนประกอบและการย่อยปัญหา (Decomposition)",
        "description": "วิเคราะห์และจำแนกปัญหาใหญ่ออกเป็นปัญหาย่อยๆ ที่เป็นอิสระต่อกัน เพื่อให้จัดการและแก้ไขได้อย่างมีประสิทธิภาพ (2.5 คะแนน)",
        "sample_answer": "• ปัญหาย่อยที่ 1: ยางรถยนต์รั่ว/แบน ทำให้ล้อไม่สามารถหมุนเคลื่อนที่ได้อย่างปลอดภัยและเสี่ยงต่อการเกิดอุบัติเหตุ\n• ปัญหาย่อยที่ 2: ระดับน้ำมันเชื้อเพลิงใกล้หมด ทำให้มีความเสี่ยงที่เครื่องยนต์จะดับหากเดินทางระยะไกล\n• ปัญหาย่อยที่ 3: ข้อจำกัดด้านเวลาในการเดินทางไปทำงานในชั่วโมงเร่งด่วน"
      },
      {
        "step": 2,
        "title": "2. การหารูปแบบของปัญหา (Pattern Recognition)",
        "description": "ระบุแบบแผน ความเหมือน หรือความคล้ายคลึงจากประสบการณ์เดิม เพื่อจัดลำดับความเร่งด่วนในการแก้ปัญหา (2.5 คะแนน)",
        "sample_answer": "• จากประสบการณ์เดิมและแบบแผนความปลอดภัยทางวิศวกรรมยานยนต์ ปัญหายางแบนเป็นปัญหาเชิงโครงสร้างเร่งด่วนที่สุด เพราะหากฝืนขับต่อไปจะทำให้กระทะล้อบิดงอและควบคุมรถไม่ได้ จึงต้องแก้ไขเป็นลำดับแรก\n• รูปแบบปริมาณน้ำมัน: จากเกจวัดน้ำมันที่ยังเหลืออยู่ สามารถวิ่งต่อไปได้อีกประมาณ 15-20 กิโลเมตร ซึ่งเพียงพอสำหรับการขับไปยังสถานีบริการน้ำมันที่ใกล้ที่สุดหลังจากเปลี่ยนยางเสร็จสิ้น"
      },
      {
        "step": 3,
        "title": "3. การคิดเชิงนามธรรม (Abstraction)",
        "description": "คัดกรองเฉพาะสาระสำคัญที่จำเป็นต่อการแก้ปัญหา และละทิ้งรายละเอียดปลีกย่อยที่ไม่เกี่ยวข้องออกไป (2.5 คะแนน)",
        "sample_answer": "• ข้อมูลสาระสำคัญ (Key Information): ตำแหน่งของล้อที่แบน, เครื่องมือช่าง (แม่แรงและประแจขันล้อ), ยางอะไหล่สำรองที่พร้อมใช้งาน, ระยะทางไปยังสถานีบริการน้ำมันที่ใกล้ที่สุด\n• รายละเอียดที่ไม่จำเป็น (Filtered Details): สีของตัวรถยนต์, เพลงที่เปิดฟังในห้องโดยสาร, สภาพภูมิอากาศภายนอก, ยี่ห้อของเสื้อผ้าที่ตะวันสวมใส่"
      },
      {
        "step": 4,
        "title": "4. การออกแบบขั้นตอนวิธีในการแก้ปัญหา (Algorithm Design)",
        "description": "ออกแบบลำดับขั้นตอนการปฏิบัติงานเพื่อแก้ปัญหาอย่างชัดเจน เรียงตามลำดับ ไม่กำกวม และมีจุดสิ้นสุด (2.5 คะแนน)",
        "sample_answer": "ขั้นตอนที่ 1: จอดรถยนต์ชิดไหล่ทาง เปิดไฟฉุกเฉิน และดึงเบรกมือเพื่อความปลอดภัย\nขั้นตอนที่ 2: นำอุปกรณ์แม่แรง ประแจขันล้อ และยางอะไหล่ออกจากกระโปรงท้ายรถ\nขั้นตอนที่ 3: ใช้ประแจคลายน็อตล้อที่แบนเล็กน้อย แล้วใช้แม่แรงยกรถขึ้นจนล้อลอยพ้นพื้น\nขั้นตอนที่ 4: ถอดน็อตล้อออกทั้งหมด นำล้อที่แบนออก แล้วใส่ยางอะไหล่เข้าไปแทนที่ ขันน็อตพอตึงมือ\nขั้นตอนที่ 5: ค่อยๆ ลดแม่แรงลงจนล้อแตะพื้น ขันน็อตล้อให้แน่นสนิททุกตัวเป็นแนวทแยงมุม\nขั้นตอนที่ 6: เก็บอุปกรณ์ทั้งหมดขึ้นรถ สตาร์ตเครื่องยนต์ แล้วขับด้วยความเร็วปลอดภัยไปยังสถานีบริการน้ำมันที่ใกล้ที่สุดเพื่อเติมน้ำมันและตรวจเช็กแรงดันลมยาง"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. การแยกส่วนประกอบ (2.5 คะแนน): จำแนกปัญหาย่อยได้ครบถ้วนและตรงประเด็น (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n2. การหารูปแบบ (2.5 คะแนน): เชื่อมโยงประสบการณ์และจัดลำดับความเร่งด่วนได้สมเหตุสมผล (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n3. การคิดเชิงนามธรรม (2.5 คะแนน): คัดแยกสาระสำคัญและตัดรายละเอียดที่ไม่จำเป็นได้อย่างชัดเจน (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n4. การออกแบบขั้นตอนวิธี (2.5 คะแนน): ลำดับขั้นตอนเป็นระบบ ชัดเจน ปฏิบัติได้จริง และมีจุดสิ้นสุด (ดีเยี่ยม 2.5 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)"
  },
  {
    "id": "ws-1-2",
    "unit_id": "mod-1",
    "unit": "หน่วยการเรียนรู้ที่ 1",
    "code": "ใบงานที่ 1.2",
    "title": "ใบงานที่ 1.2: เรื่อง การพัฒนาระบบด้วยวงจร SDLC (กรณีศึกษาร้านเบเกอรี)",
    "subtitle": "การประยุกต์ใช้วงจรการพัฒนาระบบ 5 ขั้นตอนเพื่อแก้ปัญหาธุรกิจจริง",
    "plan": "แผนการจัดการเรียนรู้ที่ 2: การพัฒนาโครงงานด้วยวงจร SDLC",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-10-30",
    "asg_id": "asg-2",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนศึกษาสถานการณ์ของร้าน Bakery Delight และเขียนแผนการพัฒนาระบบสารสนเทศตามขั้นตอนของวงจรการพัฒนาระบบ (SDLC) ทั้ง 5 ขั้นตอนให้ครบถ้วน ชัดเจน และสอดคล้องกับหลักวิศวกรรมซอฟต์แวร์",
    "scenario": "ร้าน Bakery Delight ประสบปัญหายอดขายตกต่ำ สินค้าเบเกอรีเหลือทิ้งจำนวนมากในแต่ละวันเนื่องจากไม่ทราบพฤติกรรมการซื้อที่แท้จริงของลูกค้า และการจัดการสต็อกวัตถุดิบล่าช้าเพราะใช้สมุดจดบันทึกมือ เจ้าของร้านต้องการพัฒนาระบบ POS และระบบบริหารจัดการสต็อกอัจฉริยะเพื่อลดความสูญเสียและเพิ่มยอดขาย ให้นักเรียนวางแผนพัฒนาระบบตามขั้นตอน SDLC ทั้ง 5 ขั้นตอน",
    "tasks": [
      {
        "step": 1,
        "title": "1. ขั้นตอนการวางแผน (Planning)",
        "description": "กำหนดเป้าหมาย วัตถุประสงค์ ขอบเขต และศึกษาความเป็นไปได้ (Feasibility Study) ของระบบ (2 คะแนน)",
        "sample_answer": "• วัตถุประสงค์: 1) ลดปริมาณขนมเหลือทิ้งไม่น้อยกว่า 50% ภายใน 3 เดือน 2) พัฒนาระบบ POS บันทึกการขายและตัดสต็อกวัตถุดิบแบบ Real-time\n• ขอบเขต: ติดตั้งใช้งานที่เคาน์เตอร์ขายหน้าร้าน 1 จุด และห้องเตรียมวัตถุดิบหลังร้าน 1 จุด\n• การศึกษาความเป็นไปได้: ใช้แท็บเล็ตเดิมของทางร้านร่วมกับระบบ Cloud Web Application ทำให้ประหยัดต้นทุนฮาร์ดแวร์และมีความเป็นไปได้สูงด้านงบประมาณ"
      },
      {
        "step": 2,
        "title": "2. ขั้นตอนการวิเคราะห์ (Analysis)",
        "description": "วิเคราะห์ปัญหาในระบบเดิมและระบุข้อกำหนดความต้องการเชิงหน้าที่ (Functional Requirements) (2 คะแนน)",
        "sample_answer": "• ปัญหาเดิม: การบันทึกด้วยมือทำให้สต็อกคลาดเคลื่อน เช็กยอดขายล่าช้า ไม่ทราบเมนูที่ขายดี\n• Functional Requirements (ความต้องการระบบ):\n  1) ระบบบันทึกการขายผ่านการสแกนบาร์โค้ดสินค้าและคำนวณเงินพร้อมออกใบเสร็จ\n  2) ระบบตัดยอดสต็อกวัตถุดิบอัตโนมัติตามสูตรขนม (BOM: Bill of Materials)\n  3) ระบบแจ้งเตือนเมื่อวัตถุดิบใกล้หมดหรือขนมใกล้หมดอายุ\n  4) ระบบจัดทำรายงานสรุปยอดขายประจำวันและเมนูยอดนิยม"
      },
      {
        "step": 3,
        "title": "3. ขั้นตอนการออกแบบ (Design)",
        "description": "ออกแบบผังงานการทำงาน (Flowchart) สถาปัตยกรรมระบบ และแบบร่างหน้าจอผู้ใช้ (UI Mockup) (2 คะแนน)",
        "sample_answer": "• ผังงานระบบ POS: เริ่มต้น -> สแกนบาร์โค้ด -> ตรวจสอบสต็อก -> คำนวณยอดเงินรวมและส่วนลด -> รับชำระเงิน (เงินสด/QR Code) -> บันทึกยอดขายและตัดสต็อก -> พิมพ์ใบเสร็จ/แสดงผล -> จบการทำงาน\n• ออกแบบ UI: หน้าจอแบบสัมผัส (Touchscreen Friendly) มีรูปภาพเมนูขนมชัดเจน ปุ่มกดขนาดใหญ่ สรุปยอดเงินตัวเลขขนาดใหญ่ และมีปุ่มเลือกรับเงินสดหรือสแกน QR Code พร้อมเพย์"
      },
      {
        "step": 4,
        "title": "4. ขั้นตอนการพัฒนาและติดตั้ง (Implementation & Testing)",
        "description": "วางแผนการเขียนโปรแกรมและการทดสอบระบบตามมาตรฐาน 4 ระดับ (2 คะแนน)",
        "sample_answer": "• การพัฒนา: พัฒนาด้วยเทคโนโลยี Web Application (Node.js + SQLite Database) ที่ทำงานได้ทั้งบนแท็บเล็ตและคอมพิวเตอร์\n• แผนการทดสอบ 4 ระดับ:\n  1) Unit Testing: ตรวจสอบฟังก์ชันคำนวณราคาและส่วนลดว่าถูกต้องแม่นยำ\n  2) Integration Testing: ทดสอบการเชื่อมโยงระหว่างหน้าขายหน้าร้านกับการตัดยอดสต็อกในฐานข้อมูล\n  3) System Testing: ทดสอบความเร็วในการออกใบเสร็จและการทำงานต่อเนื่องทั้งวัน\n  4) UAT: ให้พนักงานขายทดลองใช้งานจริงหน้าร้าน 3 วันก่อนเปิดระบบจริง"
      },
      {
        "step": 5,
        "title": "5. ขั้นตอนการบำรุงรักษา (Maintenance)",
        "description": "กำหนดแนวทางการฝึกอบรมพนักงาน การสำรองข้อมูล และแผนการดูแลรักษาระบบต่อเนื่อง (2 คะแนน)",
        "sample_answer": "• จัดอบรมพนักงานขายและผู้จัดการร้าน 1 วันก่อนเปิดใช้งานระบบจริง พร้อมจัดทำคู่มือการใช้งานฉบับกระชับ\n• กำหนดแผนสำรองข้อมูล (Backup) อัตโนมัติทุกสิ้นวันไปยังระบบ Cloud Storage\n• การบำรุงรักษาแก้ไข (Corrective Maintenance): แก้ไข Bug ภายใน 2 ชั่วโมงหากระบบขายติดขัด และการปรับปรุงระบบ (Perfective Maintenance) ตามเทศกาลโปรโมชั่น"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน (5 ด้าน ด้านละ 2 คะแนน):\n1. การวางแผน (2 คะแนน): กำหนดเป้าหมาย ขอบเขต และศึกษาความเป็นไปได้ชัดเจน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n2. การวิเคราะห์ (2 คะแนน): ระบุปัญหาเดิมและความต้องการระบบได้ตรงประเด็น (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n3. การออกแบบ (2 คะแนน): ออกแบบผังงานและหน้าจอ UI ได้ถูกต้องตามหลักการ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n4. การพัฒนาและทดสอบ (2 คะแนน): กำหนดแผนการพัฒนาและการทดสอบ 4 ระดับได้สมบูรณ์ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n5. การบำรุงรักษา (2 คะแนน): แผนการอบรม การสำรองข้อมูล และการดูแลรักษาระบบปฏิบัติได้จริง (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  },
  {
    "id": "ws-1-3",
    "unit_id": "mod-1",
    "unit": "หน่วยการเรียนรู้ที่ 1",
    "code": "ใบงานที่ 1.3",
    "title": "ใบงานที่ 1.3: เรื่อง การจัดทำเค้าโครงรายงานโครงงาน 5 บท",
    "subtitle": "การจัดทำเอกสารรายงานโครงงานคอมพิวเตอร์ตามระเบียบวิธีวิจัยและมาตรฐาน สพฐ.",
    "plan": "แผนการจัดการเรียนรู้ที่ 3: การเขียนรายงานการพัฒนาโครงงาน",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-11-15",
    "asg_id": "asg-3",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนจัดทำเค้าโครงรายงานโครงงานคอมพิวเตอร์ตามแบบฟอร์มมาตรฐาน 5 บทของ สพฐ. ให้มีความสมบูรณ์ทางวิชาการและครอบคลุมทั้ง 3 ส่วนหลักของรายงาน",
    "scenario": "นักเรียนกลุ่มหนึ่งได้รับอนุมัติหัวข้อโครงงาน \"ระบบจัดการขยะรีไซเคิลอัจฉริยะในสถานศึกษา (Smart Recycle Portal)\" ครูที่ปรึกษาโครงงานได้มอบหมายให้นักเรียนจัดทำโครงสร้างเค้าโครงรายงาน 5 บทตามมาตรฐานวิชาการของ สพฐ. เพื่อเตรียมพร้อมสำหรับการเขียนเล่มรายงานฉบับสมบูรณ์ ให้นักเรียนร่างองค์ประกอบและสาระสำคัญของแต่ละส่วนตามระเบียบวิธีวิจัย",
    "tasks": [
      {
        "step": 1,
        "title": "1. ส่วนประกอบตอนต้นของรายงาน (Preliminary Section)",
        "description": "ระบุองค์ประกอบส่วนนำให้ครบถ้วนตามลำดับมาตรฐาน และเขียนร่างตัวอย่างบทคัดย่อ (Abstract) แบบกระชับ (2 คะแนน)",
        "sample_answer": "• ลำดับองค์ประกอบส่วนนำ: 1) ปกนอก 2) ใบรองปก 3) ปกใน 4) บทคัดย่อ (ภาษาไทยและอังกฤษ) 5) กิตติกรรมประกาศ 6) สารบัญ 7) สารบัญตาราง 8) สารบัญภาพ\n• ตัวอย่างบทคัดย่อ: โครงงานนี้มีวัตถุประสงค์เพื่อพัฒนาระบบจัดการขยะรีไซเคิลอัจฉริยะในสถานศึกษา โดยประยุกต์ใช้วงจร SDLC และแนวคิดเชิงคำนวณ กลุ่มตัวอย่างคือนักเรียน ม.4 จำนวน 120 คน ผลการดำเนินงานพบว่าระบบสามารถบันทึกแต้มสะสมและน้ำหนักขยะได้อย่างถูกต้อง 100% และผู้ใช้งานมีความพึงพอใจในระดับมากที่สุด (x̄ = 4.65)"
      },
      {
        "step": 2,
        "title": "2. ส่วนเนื้อหา บทที่ 1 บทนำ และ บทที่ 2 ทฤษฎีที่เกี่ยวข้อง",
        "description": "กำหนดความเป็นมา วัตถุประสงค์ ขอบเขต และหัวข้อทฤษฎี/เทคโนโลยีอ้างอิงที่จำเป็น (3 คะแนน)",
        "sample_answer": "• บทที่ 1 บทนำ:\n  - ที่มาและความสำคัญ: ปัญหาขยะล้นโรงเรียนและขาดแรงจูงใจในการคัดแยกขยะ\n  - วัตถุประสงค์: 1) พัฒนาระบบบันทึกแต้มรีไซเคิล 2) ประเมินความพึงพอใจของผู้ใช้งาน\n  - ขอบเขต: ใช้กับขยะ 3 ประเภท (ขวดพลาสติก, กระป๋องอลูมิเนียม, กระดาษ) ในโรงเรียน\n• บทที่ 2 เอกสารและงานวิจัยที่เกี่ยวข้อง:\n  - 1) แนวคิดเชิงคำนวณและวงจร SDLC 2) ระบบฐานข้อมูลเชิงสัมพันธ์ 3) เทคโนโลยี Web Application 4) งานวิจัยเกี่ยวกับการจัดการขยะในสถานศึกษา"
      },
      {
        "step": 3,
        "title": "3. ส่วนเนื้อหา บทที่ 3, 4 และ 5 (Methodology, Results, Conclusion)",
        "description": "อธิบายเครื่องมือที่ใช้ ขั้นตอนวิธีดำเนินงาน รูปแบบการนำเสนอผลการทดลอง และการอภิปรายผล (3 คะแนน)",
        "sample_answer": "• บทที่ 3 วิธีดำเนินการ: ระบุประชากรกลุ่มตัวอย่าง, เครื่องมือฮาร์ดแวร์/ซอฟต์แวร์ที่ใช้พัฒนา, ผังงานระบบ (System Flowchart), ขั้นตอนการพัฒนา 5 ขั้นตอนของ SDLC\n• บทที่ 4 ผลการดำเนินงาน: นำเสนอภาพหน้าจอระบบที่พัฒนาเสร็จสมบูรณ์ และตารางสถิติเปรียบเทียบปริมาณขยะที่คัดแยกได้ก่อน-หลังใช้ระบบ\n• บทที่ 5 สรุปผล อภิปรายผล และข้อเสนอแนะ: สรุปผลสัมฤทธิ์เทียบกับวัตถุประสงค์, อภิปรายจุดเด่นและข้อจำกัดของระบบ, เสนอแนะการเชื่อมต่อกับเครื่องชั่งน้ำหนักดิจิทัลอัตโนมัติในอนาคต"
      },
      {
        "step": 4,
        "title": "4. ส่วนประกอบตอนท้ายและบรรณานุกรม APA 7th Edition",
        "description": "เขียนตัวอย่างรายการอ้างอิงบรรณานุกรมรูปแบบ APA 7th Edition จำนวน 2 รายการ และระบุสิ่งที่ต้องมีในภาคผนวก (2 คะแนน)",
        "sample_answer": "• ตัวอย่างบรรณานุกรม APA 7th:\n  1) กระทรวงศึกษาธิการ. (2560). ตัวชี้วัดและสาระการเรียนรู้แกนกลาง กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี (ฉบับปรับปรุง พ.ศ. 2560). โรงพิมพ์ชุมนุมสหกรณ์การเกษตรแห่งประเทศไทย.\n  2) บุญยงค์, ป. (2568). การพัฒนาทักษะแนวคิดเชิงคำนวณผ่านโครงงานเทคโนโลยี. วารสารนวัตกรรมการศึกษา, 12(3), 45-58.\n• สิ่งที่ต้องมีในภาคผนวก: แบบสอบถามความพึงพอใจ, ซอร์สโค้ดโปรแกรมสำคัญ, ภาพถ่ายการทดสอบระบบร่วมกับผู้ใช้"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. ส่วนประกอบตอนต้น (2 คะแนน): โครงสร้างส่วนนำและบทคัดย่อถูกต้องตามแบบแผนวิชาการ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n2. บทที่ 1 และ 2 (3 คะแนน): ความเป็นมา วัตถุประสงค์ ขอบเขต และทฤษฎีอ้างอิงสมบูรณ์ (ดีมาก 3.0 | ดี 2.5 | พอใช้ 2.0 | ปรับปรุง 1.0)\n3. บทที่ 3, 4 และ 5 (3 คะแนน): วิธีดำเนินงาน การแสดงผลลัพธ์ และการสรุปอภิปรายผลเป็นระบบ (ดีมาก 3.0 | ดี 2.5 | พอใช้ 2.0 | ปรับปรุง 1.0)\n4. ส่วนท้ายและบรรณานุกรม (2 คะแนน): รูปแบบ APA 7th ถูกต้องและภาคผนวกครบถ้วน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  },
  {
    "id": "ws-2-1",
    "unit_id": "mod-2",
    "unit": "หน่วยการเรียนรู้ที่ 2",
    "code": "ใบงานที่ 2.1",
    "title": "ใบงานที่ 2.1: เรื่อง การวางแผนและการวิเคราะห์ความต้องการในการพัฒนาโครงงาน",
    "subtitle": "การกำหนดวัตถุประสงค์ ขอบเขต และแผนภูมิแกนต์ (กรณีศึกษา StyleHub)",
    "plan": "แผนการจัดการเรียนรู้ที่ 1: การวางแผนและวิเคราะห์โครงงาน",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-11-30",
    "asg_id": "asg-4",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนศึกษากรณีศึกษาเว็บไซต์แฟชั่นวัยรุ่น StyleHub แล้วกำหนดวัตถุประสงค์ ขอบเขตระบบ และจัดทำแผนภูมิแกนต์ (Gantt Chart) สำหรับการดำเนินงาน 8 สัปดาห์ให้ถูกต้องและสมบูรณ์",
    "scenario": "กลุ่มนักเรียนชั้น ม.4 ต้องการพัฒนาโครงงานเว็บไซต์จำหน่ายเสื้อผ้าวัยรุ่นออนไลน์ภายใต้ชื่อแบรนด์ StyleHub เพื่อแก้ปัญหาความยุ่งยากในการสั่งซื้อเสื้อผ้าผ่านแชตส่วนตัว ซึ่งมักเกิดข้อผิดพลาดในการคำนวณยอดเงิน การส่งสลิปปลอม และสต็อกสินค้าไม่ตรงกับความเป็นจริง ให้นักเรียนวางแผนการพัฒนาโครงงานในระยะเริ่มต้นตามขั้นตอนของ SDLC",
    "tasks": [
      {
        "step": 1,
        "title": "1. การกำหนดวัตถุประสงค์ของโครงงาน (Project Objectives)",
        "description": "กำหนดวัตถุประสงค์ของโครงงานอย่างน้อย 2 ข้อ ตามหลัก SMART (เฉพาะเจาะจง วัดผลได้ และเป็นไปได้จริง) (3 คะแนน)",
        "sample_answer": "• วัตถุประสงค์ที่ 1: เพื่อออกแบบและพัฒนาเว็บไซต์ร้านค้าเสื้อผ้าออนไลน์ StyleHub ที่รองรับการเลือกดูสินค้า สั่งซื้อ และชำระเงินอัตโนมัติได้อย่างถูกต้อง 100%\n• วัตถุประสงค์ที่ 2: เพื่อลดเวลาเฉลี่ยในการสั่งซื้อสินค้าของลูกค้าจากเดิม 15 นาที เหลือไม่เกิน 3 นาที\n• วัตถุประสงค์ที่ 3: เพื่อประเมินความพึงพอใจของกลุ่มผู้ใช้งานเป้าหมายที่มีต่อระบบให้อยู่ในระดับมาก (คะแนนเฉลี่ยไม่น้อยกว่า 3.51 จาก 5.00)"
      },
      {
        "step": 2,
        "title": "2. การกำหนดขอบเขตและกลุ่มเป้าหมาย (Scope & Target Group)",
        "description": "ระบุกลุ่มผู้ใช้งานเป้าหมาย ขอบเขตเชิงหน้าที่ของระบบ และข้อจำกัดในการพัฒนา (3 คะแนน)",
        "sample_answer": "• กลุ่มเป้าหมาย: นักเรียน นักศึกษา และเยาวชนอายุ 15-25 ปี ที่สนใจแฟชั่นและคุ้นเคยกับการซื้อของออนไลน์\n• ขอบเขตเชิงหน้าที่ (System Scope):\n  1) ระบบสำหรับลูกค้า: ค้นหาเสื้อผ้าตามหมวดหมู่/ขนาด, ตะกร้าสินค้า, ชำระเงินผ่าน QR Code, ตรวจสอบสถานะการจัดส่ง\n  2) ระบบสำหรับผู้ดูแลร้าน: จัดการข้อมูลสินค้า, ตรวจสอบยอดชำระเงิน, จัดการสต็อกสินค้า, สรุปยอดขาย\n• ข้อจำกัด: ไม่รองรับระบบผ่อนชำระ และรองรับการจัดส่งเฉพาะภายในประเทศเท่านั้น"
      },
      {
        "step": 3,
        "title": "3. แผนการดำเนินงานและทรัพยากร (Gantt Chart & Resources)",
        "description": "จัดทำตารางแผนภูมิแกนต์ 8 สัปดาห์ ครอบคลุม 5 ขั้นตอนของ SDLC พร้อมระบุผู้รับผิดชอบและทรัพยากร (4 คะแนน)",
        "sample_answer": "• ตาราง Gantt Chart 8 สัปดาห์:\n  - สัปดาห์ที่ 1: การวางแผนและการศึกษาความเป็นไปได้ (หัวหน้าโครงการ)\n  - สัปดาห์ที่ 2: การวิเคราะห์ความต้องการและการเก็บข้อมูลผู้ใช้ (นักวิเคราะห์ระบบ)\n  - สัปดาห์ที่ 3: การออกแบบโครงสร้างฐานข้อมูลและผังงาน (นักออกแบบระบบ)\n  - สัปดาห์ที่ 4: การออกแบบ UI/UX หน้าจอเว็บไซต์และ Wireframe (นักออกแบบ UI)\n  - สัปดาห์ที่ 5-6: การเขียนโปรแกรมพัฒนาเว็บไซต์ (โปรแกรมเมอร์)\n  - สัปดาห์ที่ 7: การทดสอบระบบ (Unit, Integration & UAT) (ผู้ทดสอบระบบ)\n  - สัปดาห์ที่ 8: การติดตั้งใช้งานจริง จัดทำรายงาน 5 บท และนำเสนอผลงาน (สมาชิกทุกคน)\n• ทรัพยากรที่ใช้: คอมพิวเตอร์โน้ตบุ๊ก, ซอฟต์แวร์ VS Code, Figma, ฐานข้อมูล MySQL/SQLite"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. วัตถุประสงค์โครงงาน (3 คะแนน): ชัดเจน สอดคล้องกับหลัก SMART และวัดผลสัมฤทธิ์ได้ (ดีเยี่ยม 3.0 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n2. ขอบเขตและกลุ่มเป้าหมาย (3 คะแนน): กำหนดกลุ่มเป้าหมายและฟังก์ชันงานระบบได้ชัดเจนและเป็นไปได้ (ดีเยี่ยม 3.0 | ดี 2.0 | พอใช้ 1.5 | ปรับปรุง 1.0)\n3. แผนงาน Gantt Chart (4 คะแนน): ตารางเวลา 8 สัปดาห์ครอบคลุม SDLC จัดสรรบทบาทและทรัพยากรสมบูรณ์ (ดีเยี่ยม 4.0 | ดี 3.0 | พอใช้ 2.0 | ปรับปรุง 1.0)"
  },
  {
    "id": "ws-2-2",
    "unit_id": "mod-2",
    "unit": "หน่วยการเรียนรู้ที่ 2",
    "code": "ใบงานที่ 2.2",
    "title": "ใบงานที่ 2.2: เรื่อง การวิเคราะห์ข้อมูลและออกแบบระบบ (Context Diagram & UI)",
    "subtitle": "การวิเคราะห์ข้อกำหนดเชิงหน้าที่และการออกแบบแผนภาพบริบทระบบพาณิชย์อิเล็กทรอนิกส์",
    "plan": "แผนการจัดการเรียนรู้ที่ 2: การวิเคราะห์และออกแบบระบบ",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-12-15",
    "asg_id": "asg-5",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนวิเคราะห์ความต้องการเชิงหน้าที่ 8 ฟังก์ชันหลัก ออกแบบแผนภาพบริบท (Context Diagram) และกำหนดขอบเขตข้อมูลนำเข้า-ส่งออกของระบบ StyleHub ให้ถูกต้องตามมาตรฐานวิศวกรรมซอฟต์แวร์",
    "scenario": "สืบเนื่องจากโครงงาน StyleHub ในขั้นตอนนี้ทีมผู้พัฒนาต้องเปลี่ยนความต้องการของผู้ใช้ให้กลายเป็นพิมพ์เขียวทางเทคนิค โดยต้องวิเคราะห์ฟังก์ชันการทำงานหลัก 8 ฟังก์ชัน และวาดแผนภาพบริบท (Context Diagram) แสดงการมีปฏิสัมพันธ์ระหว่างระบบกับหน่วยงานภายนอก (External Entities) พร้อมระบุขอบเขตข้อมูลนำเข้าและส่งออก",
    "tasks": [
      {
        "step": 1,
        "title": "1. การวิเคราะห์ความต้องการเชิงหน้าที่ 8 ฟังก์ชันหลัก (Functional Requirements)",
        "description": "อธิบายรายละเอียดการทำงานของ 8 ฟังก์ชันสำคัญในระบบ StyleHub อย่างกระชับและชัดเจน (4 คะแนน)",
        "sample_answer": "1) ฟังก์ชันสมัครสมาชิกและยืนยันตัวตน: ตรวจสอบความถูกต้องของอีเมลและรหัสผ่าน\n2) ฟังก์ชันแคตตาล็อกสินค้า: แสดงภาพ ราคา ขนาด และตัวเลือกสี พร้อมระบบค้นหาและตัวกรอง\n3) ฟังก์ชันจัดการตะกร้าสินค้า: เพิ่ม/ลดจำนวน คำนวณยอดเงินรวมและค่าจัดส่งอัตโนมัติ\n4) ฟังก์ชันชำระเงิน: สร้าง QR Code พร้อมเพย์ตามยอดเงินจริง และระบบอัปโหลดสลิปยืนยัน\n5) ฟังก์ชันตรวจสอบสถานะพัสดุ: แสดงเลข Tracking และขั้นตอนการจัดส่งสินค้า\n6) ฟังก์ชันจัดการสินค้าคงคลัง (Admin): เพิ่ม ลบ แก้ไขสินค้า และตัดสต็อกอัตโนมัติเมื่อเกิดการซื้อ\n7) ฟังก์ชันตรวจสอบยอดเงิน (Admin): ตรวจสอบสลิปโอนเงินและอนุมัติคำสั่งซื้อ\n8) ฟังก์ชันรายงานและสถิติ (Admin): สรุปยอดขายประจำวัน/สัปดาห์ และอันดับสินค้าขายดี"
      },
      {
        "step": 2,
        "title": "2. การออกแบบแผนภาพบริบท (Context Diagram: DFD Level 0)",
        "description": "ระบุกระบวนการหลัก (Process 0), เอนทิตีภายนอก (External Entities) และกระแสข้อมูล (Data Flows) เข้า-ออกจากระบบ (4 คะแนน)",
        "sample_answer": "• กระบวนการหลัก: Process 0 \"ระบบร้านเสื้อผ้าออนไลน์ StyleHub\"\n• External Entities และ Data Flows:\n  1) ลูกค้า (Customer):\n     - ข้อมูลเข้า: ข้อมูลสมัครสมาชิก, คำสั่งซื้อสินค้า, หลักฐานการชำระเงิน, ข้อมูลที่อยู่จัดส่ง\n     - ข้อมูลออก: แคตตาล็อกสินค้า, ใบเสร็จรับเงิน, การแจ้งเตือนสถานะคำสั่งซื้อและเลขพัสดุ\n  2) ผู้ดูแลระบบ/เจ้าของร้าน (Admin):\n     - ข้อมูลเข้า: ข้อมูลรายการสินค้าใหม่, ข้อมูลการปรับปรุงสต็อก, ผลการยืนยันยอดเงิน\n     - ข้อมูลออก: รายการคำสั่งซื้อรอตรวจสอบ, รายงานสรุปยอดขาย, การแจ้งเตือนสินค้าใกล้หมด\n  3) ระบบขนส่งพัสดุ (Shipping Partner):\n     - ข้อมูลเข้า: เลขติดตามพัสดุ (Tracking Number), สถานะการนำจ่าย\n     - ข้อมูลออก: ข้อมูลชื่อ-ที่อยู่และเบอร์โทรศัพท์ของผู้รับ"
      },
      {
        "step": 3,
        "title": "3. การกำหนดขอบเขตข้อมูลนำเข้า-ส่งออก (Input/Output Boundary)",
        "description": "สรุปโครงสร้างข้อมูลนำเข้า (Input) และข้อมูลส่งออก (Output) ที่สำคัญของระบบ (2 คะแนน)",
        "sample_answer": "• ข้อมูลนำเข้า (Input): ข้อมูลผู้ใช้งาน, รหัสสินค้า, รายการสินค้าที่เลือก, สลิปโอนเงิน, ข้อมูลที่อยู่จัดส่ง\n• ข้อมูลส่งออก (Output): หน้าจอแสดงผลสินค้า, ใบเสร็จรับเงินอิเล็กทรอนิกส์, ข้อความแจ้งเตือนคำสั่งซื้อ, รายงานสถิติยอดขายเชิงบริหาร"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน:\n1. วิเคราะห์ 8 ฟังก์ชันหลัก (4 คะแนน): ครบถ้วน ถูกต้อง ชัดเจนตามหลัก Functional Requirements (ดีเยี่ยม 4.0 | ดี 3.0 | พอใช้ 2.0 | ปรับปรุง 1.0)\n2. Context Diagram (4 คะแนน): ระบุ Process 0, Entities และ Data Flows เข้า-ออกได้ถูกต้องตามหลักสัญลักษณ์ DFD (ดีเยี่ยม 4.0 | ดี 3.0 | พอใช้ 2.0 | ปรับปรุง 1.0)\n3. ขอบเขต Input/Output (2 คะแนน): จำแนกข้อมูลนำเข้าและส่งออกได้ถูกต้องสอดคล้องกับระบบ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  },
  {
    "id": "ws-2-3",
    "unit_id": "mod-2",
    "unit": "หน่วยการเรียนรู้ที่ 2",
    "code": "ใบงานที่ 2.3",
    "title": "ใบงานที่ 2.3: เรื่อง การพัฒนาโครงงานเพื่อแก้ปัญหาตามกระบวนการ SDLC ในบริบทจริง",
    "subtitle": "การบูรณาการแนวคิดเชิงคำนวณและวงจร SDLC ครบวงจรในการแก้ปัญหาของสถานศึกษาหรือชุมชน",
    "plan": "แผนการจัดการเรียนรู้ที่ 3: การพัฒนาโครงงานเพื่อแก้ปัญหา",
    "standard": "ว 4.2 ม.4/1",
    "points": 10,
    "maxScore": 10,
    "due": "2026-12-30",
    "asg_id": "asg-6",
    "type": "ใบงาน",
    "instructions": "ให้นักเรียนเลือกปัญหาจริงในสถานศึกษาหรือชุมชน (หรือศึกษากรณีศึกษาระบบ Science Lab Portal) แล้วจัดทำแผนพัฒนาโครงงานบูรณาการแนวคิดเชิงคำนวณและ SDLC ครบทั้ง 5 ขั้นตอน พร้อมเกณฑ์วัดความสำเร็จ",
    "scenario": "ห้องปฏิบัติการวิทยาศาสตร์ของโรงเรียนวังน้ำเย็นวิทยาคมประสบปัญหาอุปกรณ์ทดลองและสารเคมีสูญหายหรือชำรุดโดยไม่ทราบผู้รับผิดชอบ บันทึกการยืม-คืนด้วยสมุดกระดาษทำให้อ่านลายมือไม่ออกและตรวจเช็กสถานะอุปกรณ์ได้ล่าช้า กลุ่มสาระการเรียนรู้วิทยาศาสตร์ต้องการพัฒนาระบบ \"Science Lab Portal\" เพื่อบันทึกการยืม-คืนอุปกรณ์ด้วยระบบสแกน QR Code ผ่านสมาร์ตโฟน ให้นักเรียนวางแผนพัฒนาโครงงานนี้อย่างครบวงจร",
    "tasks": [
      {
        "step": 1,
        "title": "1. การสำรวจและระบุปัญหา (Problem Identification)",
        "description": "ระบุสภาพปัญหา สาเหตุ ผลกระทบ และกลุ่มเป้าหมายผู้ใช้งานในบริบทจริง (2 คะแนน)",
        "sample_answer": "• สภาพปัญหา: อุปกรณ์ทดลองวิทยาศาสตร์สูญหายเฉลี่ย 15% ต่อภาคเรียน และระบบบันทึกด้วยสมุดกระดาษล่าช้า ค้นหาประวัติการยืมยาก\n• สาเหตุ: ขาดระบบยืนยันตัวตนดิจิทัลและไม่มีการแจ้งเตือนกำหนดเวลาส่งคืน\n• ผลกระทบ: โรงเรียนสูญเสียงบประมาณ และนักเรียนคาบถัดไปไม่มีอุปกรณ์ใช้งาน\n• กลุ่มเป้าหมาย: นักเรียนระดับชั้น ม.1-ม.6 (ผู้ยืม) และครู/เจ้าหน้าที่ห้องปฏิบัติการวิทยาศาสตร์ (ผู้ดูแล)"
      },
      {
        "step": 2,
        "title": "2. การวางแผนและวิเคราะห์ระบบ (Planning & Analysis)",
        "description": "กำหนดวัตถุประสงค์ ขอบเขต และข้อกำหนดความต้องการเชิงหน้าที่ของระบบ (2 คะแนน)",
        "sample_answer": "• วัตถุประสงค์: 1) พัฒนาระบบ Science Lab Portal เพื่อบันทึกการยืม-คืนด้วย QR Code 2) ลดอัตราการสูญหายของอุปกรณ์ให้เหลือ 0%\n• ขอบเขตระบบ: 1) ระบบลงทะเบียนและสร้างรหัส QR Code ประจำอุปกรณ์ 2) ระบบสแกนยืม-คืนผ่านกล้องมือถือ 3) ระบบแจ้งเตือนกำหนดส่งคืนผ่าน LINE Notify\n• ความเป็นไปได้: ใช้อุปกรณ์สมาร์ตโฟนที่มีอยู่แล้วของนักเรียนและครู ร่วมกับฐานข้อมูลออนไลน์ฟรี ทำให้ประหยัดงบประมาณ"
      },
      {
        "step": 3,
        "title": "3. การออกแบบระบบและส่วนประสานผู้ใช้ (Design & UI)",
        "description": "ออกแบบโครงสร้างฐานข้อมูล ผังงานระบบ และแบบร่างหน้าจอผู้ใช้ (Wireframe) (2 คะแนน)",
        "sample_answer": "• โครงสร้างฐานข้อมูล (3 ตารางหลัก):\n  1) Users (UserID, FullName, Classroom, LineID)\n  2) Equipments (EquipmentID, Name, Category, QRCode, Status)\n  3) BorrowRecords (RecordID, UserID, EquipmentID, BorrowDate, DueDate, ReturnDate, Status)\n• ผังงาน: สแกนบัตรนักเรียน -> สแกน QR Code อุปกรณ์ -> ตรวจสอบสถานะว่าว่าง -> บันทึกการยืมและส่งข้อความแจ้งเตือน -> จบการทำงาน\n• ออกแบบ UI: หน้าจอสแกนขนาดใหญ่ ใช้งานง่ายด้วยมือเดียว มีสีแสดงสถานะชัดเจน (เขียว = ว่าง, แดง = ถูกยืม)"
      },
      {
        "step": 4,
        "title": "4. การพัฒนาและทดสอบระบบ (Implementation & Testing)",
        "description": "วางแผนขั้นตอนการเขียนโปรแกรมและการทดสอบระบบเพื่อหาข้อบกพร่อง (2 คะแนน)",
        "sample_answer": "• การพัฒนา: พัฒนาเป็น Mobile-Friendly Web Application ใช้งานได้ทันทีผ่านเว็บบราวเซอร์โดยไม่ต้องติดตั้งแอป\n• การทดสอบระบบ:\n  1) Unit Test: ทดสอบความเร็วและความแม่นยำในการอ่าน QR Code ในที่แสงน้อย\n  2) System Test: ทดสอบการทำงานร่วมกับระบบแจ้งเตือน LINE Notify เมื่อเลยกำหนดส่งคืน\n  3) UAT: ให้ครูผู้ดูแลห้องแล็บและนักเรียนตัวแทน 30 คนทดลองใช้งานจริงในชั่วโมงปฏิบัติการ 1 สัปดาห์"
      },
      {
        "step": 5,
        "title": "5. การประเมินผลและการบำรุงรักษา (Evaluation & Maintenance)",
        "description": "กำหนดตัวชี้วัดความสำเร็จของโครงงาน (KPI) และแผนการดูแลรักษาระบบอย่างต่อเนื่อง (2 คะแนน)",
        "sample_answer": "• ตัวชี้วัดความสำเร็จ (KPI):\n  1) อัตราอุปกรณ์สูญหายลดลงเป็น 0 ชิ้น ตลอด 1 ภาคเรียน\n  2) ความพึงพอใจของครูผู้ดูแลห้องแล็บและนักเรียนอยู่ในระดับมากที่สุด (คะแนนเฉลี่ย >= 4.50 จาก 5.00)\n• แผนการบำรุงรักษา: สำรองข้อมูลฐานข้อมูลทุกสิ้นสัปดาห์, ทำความสะอาดและพิมพ์เปลี่ยนสติกเกอร์ QR Code ที่ชำรุดทุกสิ้นภาคเรียน, และปรับปรุงสิทธิ์การเข้าถึงของผู้ใช้งานทุกปีการศึกษา"
      }
    ],
    "rubric": "เกณฑ์การประเมินแบบรูบริกส์ (Analytic Rubric) คะแนนเต็ม 10 คะแนน (5 ด้าน ด้านละ 2 คะแนน):\n1. สำรวจและระบุปัญหา (2 คะแนน): วิเคราะห์ปัญหา สาเหตุ ผลกระทบ และกลุ่มเป้าหมายได้ชัดเจน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n2. วางแผนและวิเคราะห์ (2 คะแนน): กำหนดวัตถุประสงค์ ขอบเขต และฟังก์ชันงานได้สมบูรณ์ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n3. ออกแบบระบบและ UI (2 คะแนน): ออกแบบฐานข้อมูล ผังงาน และ Wireframe ได้ถูกต้องตามหลักวิชาชีพ (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n4. พัฒนาและทดสอบ (2 คะแนน): กำหนดแผนการพัฒนาและการทดสอบระบบรอบด้าน (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)\n5. ประเมินผลและบำรุงรักษา (2 คะแนน): กำหนดตัวชี้วัด KPI ชัดเจนและแผนบำรุงรักษาปฏิบัติได้จริง (ดีมาก 2.0 | ดี 1.5 | พอใช้ 1.0 | ปรับปรุง 0.5)"
  }
],
    slides: [
      {
        id: 'sld-1',
        unit: 'หน่วยการเรียนรู้ที่ 1',
        title: 'สไลด์ประกอบการสอน: แนวคิดเชิงคำนวณในการพัฒนาโครงงาน (18 สไลด์)',
        description: 'สไลด์บรรยายสรุป 4 องค์ประกอบ: Decomposition, Pattern, Abstraction, Algorithm และตัวอย่างชีวิตประจำวัน',
        slideCount: 18,
        previewImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
        slides: [
          { page: 1, title: 'บทนำสู่แนวคิดเชิงคำนวณ (Computational Thinking)', note: 'ความหมายและนิยามตามหลักสูตรแกนกลาง ตัวชี้วัด ว 4.2 ม.4/1' },
          { page: 2, title: '1. การแตกย่อยปัญหา (Decomposition)', note: 'การแบ่งปัญหาใหญ่ที่ซับซ้อนให้เป็นปัญหาย่อยๆ เพื่อให้จัดการได้ง่าย' },
          { page: 3, title: '2. การหารูปแบบ (Pattern Recognition)', note: 'การค้นหาความเหมือน คล้ายคลึง หรือแนวโน้มของสถานการณ์' },
          { page: 4, title: '3. การคิดเชิงนามธรรม (Abstraction)', note: 'การมุ่งเน้นเฉพาะสาระสำคัญที่จำเป็น และตัดรายละเอียดที่ไม่เกี่ยวข้องออกไป' },
          { page: 5, title: '4. การออกแบบอัลกอริทึม (Algorithm Design)', note: 'การออกแบบลำดับขั้นตอนคำสั่งอย่างชัดเจน เพื่อนำไปสู่การแก้ปัญหา' }
        ]
      },
      {
        id: 'sld-2',
        unit: 'หน่วยการเรียนรู้ที่ 1',
        title: 'สไลด์ประกอบการสอน: วงจรการพัฒนาระบบสารสนเทศ (SDLC 5 ขั้นตอน)',
        description: 'เจาะลึก 5 ขั้นตอนการพัฒนาระบบ การจัดทำตารางเวลา Gantt Chart และเค้าโครงรายงานโครงงาน 5 บท',
        slideCount: 22,
        previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        slides: [
          { page: 1, title: 'SDLC (Software Development Life Cycle)', note: 'กระบวนการทำงานเพื่อสร้างระบบซอฟต์แวร์อย่างมีแบบแผนและมาตรฐาน' },
          { page: 2, title: 'ขั้นตอนที่ 1: การวางแผน (Planning)', note: 'กำหนดขอบเขต วัตถุประสงค์ ทรัพยากร และตารางเวลา (Gantt Chart)' },
          { page: 3, title: 'ขั้นตอนที่ 2: การวิเคราะห์ (Analysis)', note: 'เก็บรวบรวม Requirement และศึกษาความเป็นไปได้ (Feasibility Study)' },
          { page: 4, title: 'ขั้นตอนที่ 3: การออกแบบ (Design)', note: 'ออกแบบผังงาน (Flowchart) ผังฐานข้อมูล (ERD) และ UI Mockup' },
          { page: 5, title: 'ขั้นตอนที่ 4 & 5: พัฒนา ทดสอบ และบำรุงรักษา', note: 'การเขียนโค้ด (Coding) การทดสอบ (Testing) และการดูแลรักษาระบบ (Maintenance)' }
        ]
      },
      {
        id: 'sld-3',
        unit: 'หน่วยการเรียนรู้ที่ 2',
        title: 'สไลด์ประกอบการสอน: การประยุกต์ใช้แนวคิดเชิงคำนวณเพื่อพัฒนาโครงงาน',
        description: 'การศึกษาความเป็นไปได้ การเขียนผังงาน (Flowchart) การเขียนโค้ด การทดสอบระบบ และการนำเสนอผลงาน',
        slideCount: 26,
        previewImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80',
        slides: [
          { page: 1, title: 'การเริ่มต้นพัฒนาโครงงาน ม.4', note: 'จากปัญหาในชุมชนสู่การออกแบบนวัตกรรมดิจิทัล' },
          { page: 2, title: 'สัญลักษณ์มาตรฐานผังงาน (Flowchart Standards)', note: 'Terminal, Process, Decision, Input/Output, Connector' },
          { page: 3, title: 'การจัดทำรายงานโครงงาน 5 บท', note: 'บทที่ 1 บทนำ, บทที่ 2 ทฤษฎี, บทที่ 3 วิธีดำเนินการ, บทที่ 4 ผลการศึกษา, บทที่ 5 สรุป' },
          { page: 4, title: 'การทดสอบประสิทธิภาพและ Peer Review', note: 'การประเมินจากผู้เชี่ยวชาญ ครู และเพื่อนนักเรียน' }
        ]
      }
    ],

    teacher_info: {
      name: 'ครูปณิฏฐา บุญยงค์',
      title: 'ผู้เชี่ยวชาญ / ครูผู้สอน วิทยาการคำนวณ ม.4',
      position: 'ครูชำนาญการพิเศษ กลุ่มสาระการเรียนรู้วิทยาศาสตร์และเทคโนโลยี',
      school: 'โรงเรียนมาตรฐานสากล สพฐ.',
      email: 'panittha.cs@school.ac.th',
      phone: '081-234-5678',
      lineId: '@krupanittha_cs',
      office: 'ห้องปฏิบัติการคอมพิวเตอร์ 3 ชั้น 2 อาคารเฉลิมพระเกียรติ',
      officeHours: 'วันจันทร์ - ศุกร์ เวลา 15:30 - 16:30 น.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Panittha',
      bio: 'ผู้เชี่ยวชาญการจัดการเรียนรู้วิทยาการคำนวณและการพัฒนาโครงงานทางเทคโนโลยีสารสนเทศตามหลักสูตรแกนกลาง ม.4 มีประสบการณ์สอนและเป็นวิทยากรอบรมครูระดับประเทศกว่า 15 ปี'
    },

    questions: [
      {
        id: 'q-1',
        student_id: 'u-student1',
        student_name: 'นายณัฐวุฒิ เรียนดี',
        subject: 'สอบถามเรื่องการเขียนผังงานในบทที่ 3 ครับ',
        question: 'ในกรณีที่มีเงื่อนไขตรวจสอบหลายชั้น ควรใช้ Decision ซ้อนกัน หรือแยกเป็นฟังก์ชันย่อยครับครู?',
        reply: 'สวัสดีณัฐวุฒิ หากเงื่อนไขซับซ้อน แนะนำให้ใช้ Abstraction โดยสร้างเป็น Subroutine/ฟังก์ชันย่อย จะทำให้ผังงานหลักอ่านเข้าใจง่ายและเป็นระเบียบตามมาตรฐานครับ',
        replied_by: 'ครูปณิฏฐา บุญยงค์',
        created_at: '2026-09-17T14:20:00.000Z',
        status: 'replied'
      }
    ],

    sync_logs: []
  };
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.data = defaultData();
      this.save();
    } else {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Error reading db.json, creating new database:', err);
        this.data = defaultData();
        this.save();
      }
    }
  }

  save() {
    try {
      const serialized = JSON.stringify(this.data, null, 2);
      const tmpFile = DB_FILE + '.tmp';
      const bakFile = DB_FILE + '.bak';

      // 1. Write to temporary file first
      fs.writeFileSync(tmpFile, serialized, 'utf-8');

      // 2. Backup existing file if exists
      if (fs.existsSync(DB_FILE)) {
        try {
          fs.copyFileSync(DB_FILE, bakFile);
        } catch (bakErr) {
          // non-critical backup error
        }
      }

      // 3. Atomically rename temp file to target DB_FILE (replace)
      try {
        if (process.platform === 'win32' && fs.existsSync(DB_FILE)) {
          // On Windows, renameSync fails if target exists, so we copy or replace safely
          fs.copyFileSync(tmpFile, DB_FILE);
          try { fs.unlinkSync(tmpFile); } catch (e) {}
        } else {
          fs.renameSync(tmpFile, DB_FILE);
        }
      } catch (renameErr) {
        fs.writeFileSync(DB_FILE, serialized, 'utf-8');
      }
    } catch (err) {
      console.error('[Database Atomic Save Error]:', err.message);
    }
  }

  get(collection) {
    return this.data[collection] || [];
  }

  find(collection, queryFn) {
    return this.get(collection).filter(queryFn);
  }

  findOne(collection, queryFn) {
    return this.get(collection).find(queryFn);
  }

  set(collection, data) {
    this.data[collection] = data;
    this.save();
    return this.data[collection];
  }

  insert(collection, item) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    this.data[collection].push(item);
    this.save();
    return item;
  }

  update(collection, queryFn, updates) {
    let updatedItem = null;
    this.data[collection] = (this.data[collection] || []).map(item => {
      if (queryFn(item)) {
        updatedItem = { ...item, ...updates };
        return updatedItem;
      }
      return item;
    });
    this.save();
    return updatedItem;
  }

  delete(collection, queryFn) {
    const before = (this.data[collection] || []).length;
    this.data[collection] = (this.data[collection] || []).filter(item => !queryFn(item));
    this.save();
    return before - this.data[collection].length;
  }
}

module.exports = new Database();
