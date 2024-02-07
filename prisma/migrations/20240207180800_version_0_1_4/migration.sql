-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_id_user_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_other_user_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_id_user_fkey";

-- DropForeignKey
ALTER TABLE "etalase" DROP CONSTRAINT "etalase_id_shop_fkey";

-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_id_order_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_user_fkey";

-- DropForeignKey
ALTER TABLE "product_details" DROP CONSTRAINT "product_details_id_product_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_id_product_fkey";

-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_id_user_fkey";

-- DropForeignKey
ALTER TABLE "shops" DROP CONSTRAINT "shops_id_admin_fkey";

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_id_admin_fkey" FOREIGN KEY ("id_admin") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_id_other_user_fkey" FOREIGN KEY ("id_other_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etalase" ADD CONSTRAINT "etalase_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
