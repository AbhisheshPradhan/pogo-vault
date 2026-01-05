<!-- Drop old data -->

npx prisma migrate reset

<!-- Update DB Model -->

npx prisma generate
npx prisma migrate dev --name [NAME]

<!-- Seeding from terminal -->

npx tsx prisma/seed.ts

<!-- Seeding within docker container -->

docker compose exec backend npx prisma db seed

<!-- Prisma Studio -->

npx prisma studio
