# Telephone Taxi Booking Operator

## Yêu cầu
Bài tập nhóm:
Thực hiện module đặt xe từ hệ thống tổng đài theo [mô tả bên dưới](https://sleepy-sidecar-3e2.notion.site/Software-Architecture-1f07464c519d45798ef9f3934225c928?pvs=25)
- Chọn loại topology theo kiến trúc Event-Driven : Mediator/Broker
- Vẽ flow tương ứng với loại Topology đã chọn tương ứng với đặc tả
- Code theo đặc tả
- **Deadline : 14/08/2023-Nộp trên moodle**

## Cấu trúc folder
```
├── reception-service (S1)
├── location-service (S2)
├── booking-service (S3)
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
- Vào folder **_docker_**, sẽ thấy có 2 file docker compose
```
docker-compose.yaml
docker-compose(without elasticsearch).yaml
```
- Cả hai đều dùng để cài RabbitMQ lên docker, cái thứ 2 thì sẽ k cài elastic search
- Chọn 1 cái rồi copy ra ở ngoài thư mục gốc, nhớ đổi tên thành `docker-compose.yaml` mới chạy được
- Gõ lệnh cmd tại thư mục gốc để bulild (tải image, chuẩn bị container,...)
```
docker compose build
```
- Gõ lệnh cmd để chạy (có thể thêm -d ở cuối để k bị chặn cmd)
```
docker compose up -d
```
- Theo dõi docker container tại **Docker Desktop** (xem log)
- Đợi một chút có thể thử vào `http://localhost:15672` (RabbitMQ) hoặc  `http://localhost:9200` (Elastic Search) để check coi chạy được chưa 
## Hướng dẫn sơ microservice (cách truyền tin bằng Rabbit MQ)
- Thực hiện các bước [trên](https://github.com/thaichihien/telephone-booking-operator/edit/main/README.md#h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-docker) để **chạy RabbitMQ** trên Docker (k cần elastic search)
- Nhớ chạy `npm i` hoặc `pnpm i` ở cả 3 dịch vụ (hiện tại cả 3 service đang dùng **pnpm**)
- Chuyển tên tất cả file `.env.example` ở cả 3 dịch vụ (reception, location, booking) thành `.env`
- Chạy cả 3 dịch vụ (mỗi service là một terminal)
- Producer duy nhất nằm ở reception-service, truy cập swagger để test
```
http:\\localhost:3000/api
```
- Xem các log tương ứng ở các Consumer khi gửi từ Producer

## Mô hình

![architecture-model](https://github.com/thaichihien/telephone-booking-operator/blob/main/doc/architecture-model.png)




