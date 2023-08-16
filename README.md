# Telephone Taxi Booking Operator

## Yêu cầu
Bài tập nhóm:
Thực hiện module đặt xe từ hệ thống tổng đài theo [mô tả bên dưới](https://sleepy-sidecar-3e2.notion.site/Software-Architecture-1f07464c519d45798ef9f3934225c928?pvs=25)
- Chọn loại topology theo kiến trúc Event-Driven : Mediator/Broker
- Vẽ flow tương ứng với loại Topology đã chọn tương ứng với đặc tả
- Code theo đặc tả
- **Deadline : 16/08/2023-Nộp trên moodle**

## Cấu trúc folder
```
├── reception-service (S1)
├── location-service (S2)
├── booking-service (S3)
├── client
├── doc (tài liệu)
├── docker (file docker compose)
└── README.md
```

## Hướng dẫn docker
### Yêu cầu trước tiên
- Đã tải **_Docker, Docker Desktop, Docker Compose_**
- Kiểm tra bằng cách gõ cmd (này check các images có trong docker)
```
docker images
```
- Nếu có lỗi thì có thể cần chạy docker trước (khởi động **Docker Desktop**)
### Chạy docker compose:
- Gõ lệnh cmd tại thư mục gốc để bulild (tải image, chuẩn bị container,...)
```
docker compose build
```
- Gõ lệnh cmd để chạy (có thể thêm -d ở cuối để chạy background)
```
docker compose up -d
```
- Theo dõi docker container tại **Docker Desktop** (xem log)
- Đợi một chút cho toàn bộ container chạy thì vào `http:\\localhost:4000` để truy cập giao diện tổng đài
## Mô hình

![architecture-model]()