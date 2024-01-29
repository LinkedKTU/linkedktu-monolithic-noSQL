### LinkedKTU Projesi

Bu proje, öğrencilerin iş bulmalarını amaçlayan "LinkedKTU" adlı bir projedir. Node.js kullanılarak dinamik bir şekilde geliştirilmiştir ve sürekli olarak geliştirilmeye devam edecektir.

#### Önkoşullar

Bu projeyi çalıştırmak için bilgisayarınızda Node.js kurulu olmalıdır.

#### Kurulum

1. Bu depoyu klonlayın:

   ```bash
   git clone https://github.com/LinkedKTU/linkedktu-monolithic-noSQL

2. Klonladığınız dizine gidin ve gerekli bağımlılıkları yüklemek için şu komutu çalıştırın:

    ```bash
    npm install

3. Projeyi çalıştırmak için şu komutu kullanın:

    ```bash
    nodemon index.js

NOT: Projeyi başarıyla çalıştırabilmek için .env dosyası oluşturmalı ve içine MONGODB_URI ve JWT_ACCESS_SECRET bilgilerini eklemelisiniz.
