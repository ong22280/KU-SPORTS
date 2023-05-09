// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await prisma.court.deleteMany();
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.sport.deleteMany();
  await prisma.location.deleteMany();
  await prisma.type.deleteMany();
  await prisma.user.deleteMany();

  await prisma.location.createMany({
    data: [
      { name: "สนามรักบี้" },  // รักบี้
      { name: "ยิมเนเซียม" }, // ยิมนาสติก, ฟิสเนส, เทนนิส, แบดมินตัน, เซปักตะกร้อ, บริดจ์
      { name: "สระจุฬาภรณวลัยลักษณ์" }, // ว่ายน้ำ
      { name: "สนามซอฟท์บอล" }, // ซอฟท์บอล
      { name: "สนามอินทรีจันทรสถิตย์" }, //เปตอง, บาสเกตบอล, ฟุตบอล
      { name: "สนามธีระสูตบุตร" }, // ฮอกกี้, แฮนด์บอล
      { name: "สนามวอลเลย์บอล"}, //วอลเลย์บอล
      { name: "อาคารชมรมกีฬา" }, //ยูโด, ยิงปืน, เทควันโด, คาราเต้, ยิงธนู, ปิงปอง, มวย, ดาบไทย, ดาบสากล
    ],
  });

  await prisma.type.createMany({
    data: [
      { name: "ลู่ลาน/ความเร็ว" }, // ว่ายน้ำ, ยิงธนู, ยิงปืน, ฟิสเนส
      { name: "ศิลปะการต่อสู้" }, // มวย, ดาบไทย, ดาบสากล, คาราเต้, ยูโด, เทควันโด
      { name: "ตาข่าย/แร็กเก็ต" }, // เทนนิส, แบดมินตัน, วอลเลย์บอล, ปิงปอง
      { name: "ทีม/สนาม" }, // บาสเกตบอล, ฟุตบอล, ฮอกกี้, แฮนด์บอล, เซปักตะกร้อ, ซอฟท์บอล, รักบี้
      { name: "ประกวด" }, // ยิมนาสติก
      { name: "อื่นๆ" }, // เปตอง, บริดจ์
    ],
  });

  const locations = await prisma.location.findMany();
  const types = await prisma.type.findMany();

  // locations
  const rakBeeId =
    locations.find((location) => location.name === "สนามรักบี้")?.id || 1;
  const gymnasiumId =
    locations.find((location) => location.name === "สำนักการกีฬา")?.id || 1;
  const chulalongkornSwimmingPoolId =
    locations.find((location) => location.name === "สระจุฬาภรณวลัยลักษณ์")
    ?.id || 1;
  const softBallFieldId =
    locations.find((location) => location.name === "สนามซอฟท์บอล")?.id || 1;
  const inseeChandrasathitStadiumId =
    locations.find((location) => location.name === "สนามอินทรีจันทรสถิตย์")
      ?.id || 1;
  const tiRasutBuddhaField =
    locations.find(
      (location) => location.name === "สนามธีระสูตบุตร"
    )?.id || 1;
  const volleyballFieldId =
    locations.find((location) => location.name === "สนามวอลเลย์บอล")?.id || 1;
  const sportClubBuildingId =
    locations.find((location) => location.name === "อาคารชมรมกีฬา")?.id || 1;

  // types
  const speedId =
    types.find((type) => type.name === "ลู่ลาน/ความเร็ว")?.id || 1;
  const martialArtsId =
    types.find((type) => type.name === "ศิลปะการต่อสู้")?.id || 1;
  const netRacketId =
    types.find((type) => type.name === "ตาข่าย/แร็กเก็ต")?.id || 1;
  const teamFieldId = types.find((type) => type.name === "ทีม/สนาม")?.id || 1;
  const competitionId = types.find((type) => type.name === "ประกวด")?.id || 1;
  const otherId = types.find((type) => type.name === "อื่นๆ")?.id || 1;

  await prisma.sport.createMany({
    data: [
        // ลู่ลาน/ความเร็ว
        {
            name: "ว่ายน้ำ",
            main_image:
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
            price: PRICE.REGULAR,
            description:
                "สระว่ายน้ำขนาด 50 เมตร มี 8 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย",
            images: [
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
            ],
            open_time: "14:30:00.000Z",
            close_time: "16:30:00.000Z",
            slug: "swimming",
            location_id: chulalongkornSwimmingPoolId,
            type_id: speedId,
        },
        {
            name: "ยิงธนู",
            main_image:
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
            price: PRICE.REGULAR,
            description:
                "สระว่ายน้ำขนาด 50 เมตร มี 8 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย",
            images: [
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
                "https://scontent.fbkk20-1.fna.fbcdn.net/v/t39.30808-6/316800635_630820958834771_3519709165938662839_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeF9LCl9bbH5-R3B96tBRnZb6hzHsJsBn_DqHMewmwGf8A0_xhnLuR5fWWJ6aKrQREsqbgwHLnmVhVvQH-yE9L5T&_nc_ohc=9qJMCKl3PpkAX9qZhpg&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfAHOxL4ShA9lvl1xSbgs85PdAtqwECr4F53V_VY7kCzTQ&oe=645F9903",
            ],
            open_time: "14:30:00.000Z",
            close_time: "16:30:00.000Z",
            slug: "archery",
            location_id: sportClubBuildingId,
            type_id: speedId,
        },
    ],
  });

  const sports = await prisma.sport.findMany();

  const swimmingId =
    sports.find((sport) => sport.name === "ว่ายน้ำ")?.id || 1;
  const archeryId =
    sports.find((sport) => sport.name === "ยิงธนู")?.id || 1;

  await prisma.item.createMany({
    data: [
        {
            name: "เสื้อว่ายน้ำ",
            description: 
                "เสื้อว่ายน้ำ สำหรับว่ายน้ำ",
            price: "$100.00",
            sport_id: swimmingId,
        },
        {
            name: "คันธนู",
            description:
                "คันธนู สำหรับยิงธนู",
            price: "$100.00",
            sport_id: archeryId,
        }
    ],
  });

  const userA = await prisma.user.create({
    data: {
      first_name: "สมชาย",
      last_name: "ชายสม",
      email: "a@hotmail.com",
      faculty: "วิศวกรรมศาสตร์",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  const userB = await prisma.user.create({
    data: {
      first_name: "สมหญิง",
      last_name: "หญิงสม",
      email: "b@hotmail.com",
      faculty: "วิทยาศาสตร์",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  const userC = await prisma.user.create({
    data: {
      first_name: "สมหมาย",
      last_name: "หมายสม",
      email: "c@hotmail.com",
      faculty: "เศรษฐศาสตร์",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  const userD = await prisma.user.create({
    data: {
      first_name: "สมปอง",
      last_name: "ปองกูล",
      email: "d@hotmail.com",
      faculty: "แพทย์",
      password: "$2b$10$I8xkU2nQ8EAHuVOdbMy9YO/.rSU3584Y.H4LrpIujGNDtmny9FnLu",
      phone: "1112223333",
    },
  });

  await prisma.review.createMany({
    data: [
      {
        first_name: "สมชาย",
        last_name: "ชายสม",
        text: "สนุกมาก",
        rating: 5,
        sport_id: swimmingId,
        user_id: userA.id,
      },
      {
        first_name: "Laith",
        last_name: "Harb",
        text: "สนุกยิ่งกว่ามาก",
        rating: 4,
        sport_id: archeryId,
        user_id: userA.id,
      },
    ],
  });

  await prisma.court.createMany({
    data: [
      {
        sport_id: swimmingId,
        seats: 4,
      },
      {
        sport_id: swimmingId,
        seats: 4,
      },
      {
        sport_id: archeryId,
        seats: 2,
      },
    ],
  });

  res.status(200).json({ name: "hello" });
}
