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
      { name: "สนามรักบี้" }, // รักบี้
      { name: "ยิมเนเซียม" }, // ยิมนาสติก, ฟิสเนส, เทนนิส, แบดมินตัน, เซปักตะกร้อ, บริดจ์
      { name: "สระจุฬาภรณวลัยลักษณ์" }, // ว่ายน้ำ
      { name: "สนามซอฟท์บอล" }, // ซอฟท์บอล
      { name: "สนามอินทรีจันทรสถิตย์" }, //เปตอง, บาสเกตบอล, ฟุตบอล
      { name: "สนามธีระสูตบุตร" }, // ฮอกกี้, แฮนด์บอล
      { name: "สนามวอลเลย์บอล" }, //วอลเลย์บอล
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
    locations.find((location) => location.name === "ยิมเนเซียม")?.id || 1;
  const chulalongkornSwimmingPoolId =
    locations.find((location) => location.name === "สระจุฬาภรณวลัยลักษณ์")
      ?.id || 1;
  const softBallFieldId =
    locations.find((location) => location.name === "สนามซอฟท์บอล")?.id || 1;
  const inseeChandrasathitStadiumId =
    locations.find((location) => location.name === "สนามอินทรีจันทรสถิตย์")
      ?.id || 1;
  const tiRasutBuddhaField =
    locations.find((location) => location.name === "สนามธีระสูตบุตร")?.id || 1;
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
        price: PRICE.CHEAP,
        description:
          "สระว่ายน้ำขนาด 50 เมตร มี 8 สาย สามารถใช้ได้ทั้งสองสาย สายละ 4 สาย ",
        images: [
          "https://www.ku.ac.th/web-html/assets/images/sport/sport3.png",
          "https://www.coop.ku.ac.th/x/www4/image/pool.gif",
          "https://nontrigames.kus.ku.ac.th/wp-content/uploads/2016/10/YN9C6785.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "swimming",
        location_id: chulalongkornSwimmingPoolId,
        type_id: speedId,
      },
      {
        name: "ยิงธนู",
        main_image:
          "https://cdn.chiangmainews.co.th/wp-content/uploads/2020/09/04124856/S__2003583.jpg",
        price: PRICE.REGULAR,
        description:
          "เป็นกีฬาที่ใช้ธนูยิงเป้าเพื่อให้ไปตรงเป้า โดยใช้ความแข็งแรงของกล้ามเนื้อแขนและลำตัวในการยิง โดยเป้าหมายจะเป็นเป้าหมายที่มีจุดกลาง",
        images: [
          "https://cdn.chiangmainews.co.th/wp-content/uploads/2020/09/04124854/622630.jpg",
          "https://cdn.chiangmainews.co.th/wp-content/uploads/2020/09/04124855/S__2003591.jpg",
          "https://www.khaosod.co.th/wpapp/uploads/2020/05/%E0%B8%A2%E0%B8%B4%E0%B8%87%E0%B8%98%E0%B8%99%E0%B8%B9%E0%B9%84%E0%B8%94%E0%B9%89%E0%B9%80%E0%B8%AE.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "archery",
        location_id: sportClubBuildingId,
        type_id: speedId,
      },
      {
        name: "ยิงปืน",
        main_image:
          "https://www.matichon.co.th/wp-content/uploads/2020/08/117312759_1642319669264196_2171961133637422021_n.jpg",
        price: PRICE.EXPENSIVE,
        description: "กีฬาที่ผู้เล่นใช้ปืนเพื่อยิงเป้าหมายที่จุดหมายต่างๆ โดยต้องใช้ความแม่นยำและความสม่ำเสมอ",
        images: [
          "https://www.khaosod.co.th/wpapp/uploads/2022/03/273998465_354617196385719_4454917270232218694_n.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTQqWtYJhIWXVwH98scN6Yye2Ofw0cvfDLyinav8IclqWeNPYe9uNGQ_ynNHvTel3Huw&usqp=CAU",
          "https://res.klook.com/image/upload/c_fill,w_750,h_560/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/xwer6nkry6ypseugtvzp.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "shooting",
        location_id: sportClubBuildingId,
        type_id: speedId,
      },
      {
        name: "ฟิสเนส",
        main_image:
          "https://www.eng.ku.ac.th/wp-content/uploads/2019/06/Fitness-center.jpg",
        price: PRICE.CHEAP,
        description: "กีฬาที่ใช้ลูกบอลในการเล่น ผู้เล่นต้องใช้การส่งลูกบอลไปยังพื้นอีกฝั่งเพื่อให้ฝ่ายตรงข้ามไม่สามารถควบคุมลูกบอลได้",
        images: [
          "https://pe.edu.kps.ku.ac.th/pes2016/images/stories/pes2016/fitness/picture/010.JPG",
          "https://pe.edu.kps.ku.ac.th/pes2016/images/stories/pes2016/fitness/picture/12.JPG",
          "https://pe.edu.kps.ku.ac.th/pes2016/images/stories/pes2016/fitness/picture/IMG_7016.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "fitness",
        location_id: gymnasiumId,
        type_id: speedId,
      },

      // ศิลปะการต่อสู้
      {
        name: "มวย",
        main_image: "https://kps.ku.ac.th/v8/images/KAI/6PR_077.JPG",
        price: PRICE.REGULAR,
        description: "กีฬาต่อสู้ที่ใช้กลางมวยในการต่อสู้กันระหว่างสองคน โดยการต่อสู้จะใช้มือและเท้าในการโจมตีและป้องกัน",
        images: [
          "https://kps.ku.ac.th/v8/images/gallery/6PPR/6PR_001.JPG",
          "https://kps.ku.ac.th/v8/images/gallery/6PPR/6PR_003.JPG",
          "https://kps.ku.ac.th/v8/images/gallery/6PPR/6PR_005.JPG",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "boxing",
        location_id: sportClubBuildingId,
        type_id: martialArtsId,
      },
      {
        name: "ดาบไทย",
        main_image:
          "https://kps.ku.ac.th/v8/images/jeen/50233352_2181362465262274_7317027476557791232_n.jpg",
        price: PRICE.EXPENSIVE,
        description: "กีฬาต่อสู้ที่ใช้ดาบไทยในการต่อสู้ ผู้เล่นต้องใช้ทักษะการต่อสู้และการป้องกันในการทำคะแนน",
        images: [
          "https://img.youtube.com/vi/JOBTFfHJjV8/0.jpg",
          "https://movie.mthai.com/app/uploads/2015/01/00620.jpg",
          "https://img.kapook.com/u/2017/pailin_p/9993Movies/mustafarfight.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "thai-sword",
        location_id: sportClubBuildingId,
        type_id: martialArtsId,
      },
      {
        name: "ดาบสากล",
        main_image:
          "https://img.kapook.com/u/2017/pailin_p/9993Movies/mustafarfight.jpg",
        price: PRICE.CHEAP,
        description: "กีฬาต่อสู้ที่ใช้ดาบในการโจมตีและป้องกัน มีกติกาและระบบคะแนนที่แตกต่างกันไปในแต่ละรูปแบบ",
        images: [
          "https://img.youtube.com/vi/JOBTFfHJjV8/0.jpg",
          "https://movie.mthai.com/app/uploads/2015/01/00620.jpg",
          "https://kps.ku.ac.th/v8/images/jeen/50233352_2181362465262274_7317027476557791232_n.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "international-sword",
        location_id: sportClubBuildingId,
        type_id: martialArtsId,
      },
      {
        name: "คาราเต้",
        main_image:
          "https://s.isanook.com/ns/0/rp/r/w850/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL25zLzAvdWQvMjYxLzEzMDk5NTMvNDk2MDUyLTAxLmpwZw==.jpg",
        price: PRICE.REGULAR,
        description: "กีฬาที่ใช้ลูกบอลในการเล่น ทีมผู้เล่นต้องส่งลูกบอลไปยังฝั่งตรงข้ามโดยให้ลูกบอลตกอยู่ในพื้นของฝั่งตรงข้าม",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw_ilLdUu2n1JC6za56TJyLDgz0asbrbZMRSBzpXJ8o16w8KTA18RDV3De3OeSWMn6T_Y&usqp=CAU",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8eTAXuKeaNRhEJjx5fpqrHVs1A97GBCQaJpuNZXwDliONyRzP1UOGbpXGz8-JjBnF6BU&usqp=CAU",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Hanashiro_Chomo.jpg/220px-Hanashiro_Chomo.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "karate",
        location_id: sportClubBuildingId,
        type_id: martialArtsId,
      },
      {
        name: "ยูโด",
        main_image:
          "https://static.thairath.co.th/media/HCtHFA7ele6Q2dULVcHn1ejp3LUQtAA8adDKuuOEi2gaCzXI3iIw7oodYk4fifTth0.webp",
        price: PRICE.EXPENSIVE,
        description: "กีฬาที่ผู้เล่นขี่จักรยานพิเศษที่มีล้อสอง โดยต้องใช้ทักษะในการทรงตัวและสมดุลในการแข่งขัน",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtXrFGSlfng7QLa30zCFAvWQzwE42cv-a1Fy0eazU3TmAzgUyJwAXm19vrQDdcLdzQHbY&usqp=CAU",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "judo",
        location_id: sportClubBuildingId,
        type_id: martialArtsId,
      },
      {
        name: "เทควันโด",
        main_image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNizVw2_AwNgj8FI-Y4Ixn73J5Djj4wbXtGunMF-H69_7AjyQ301dhxTaSEm21UlcdGK0&usqp=CAU",
        price: PRICE.CHEAP,
        description: "กีฬาที่ผู้เล่นต้องใช้การโยนเวทและเคลื่อนที่ในรูปแบบต่างๆ เพื่อทำคะแนนในเกมตามกฎกติกา",
        images: [
          "https://www.khaosod.co.th/wpapp/uploads/2022/04/%E0%B9%80%E0%B8%97%E0%B8%84%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%82%E0%B8%94-1.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "taekwondo",
        location_id: sportClubBuildingId,
        type_id: martialArtsId,
      },

      // ตาข่าย/แร็กเก็ต
      {
        name: "เทนนิส",
        main_image:
          "https://image.makewebeasy.net/makeweb/r_260x260/fGcNDZMEO/Projects/cc27334e1ba34157bab8b8dddbe282f80_14233552_210726_0004.jpg?v=202012190947",
        price: PRICE.REGULAR,
        description: "กีฬาที่ใช้ลูกเทนนิสในการเล่น ผู้เล่นต้องใช้การตีลูกเทนนิสข้ามมากับผู้เล่นอีกฝ่ายโดยไม่ให้ลูกตกพื้น",
        images: [
          "https://image.makewebeasy.net/makeweb/r_260x260/fGcNDZMEO/Projects/cc27334e1ba34157bab8b8dddbe282f80_14233552_210726_0004.jpg?v=202012190947",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "tennis",
        location_id: gymnasiumId,
        type_id: netRacketId,
      },
      {
        name: "แบดมินตัน",
        main_image:
          "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5xT59vqgUoYkqnjSo3vK0svrkeF20XV6NwiyENxBkmSuAsSrfhY.jpg",
        price: PRICE.EXPENSIVE,
        description: "กีฬาที่ใช้ลูกแบดมินตันในการเล่น ผู้เล่นต้องใช้การตีลูกแบดข้ามมากับผู้เล่นอีกฝ่ายโดยไม่ให้ลูกตกพื้น",
        images: [
          "https://pbsport.co.th/wp-content/uploads/2018/09/pb-banner-1920x900.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "badminton",
        location_id: gymnasiumId,
        type_id: netRacketId,
      },
      {
        name: "วอลเลย์บอล",
        main_image:
          "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5BEbvhVK05j4VXFIqoVhPw1d7GCyo5TMhIcCHVV6doT2ALLyA0B.jpg",
        price: PRICE.CHEAP,
        description: "กีฬาทีี่ใช้ลูกบอลในการเล่น ทีมผู้เล่นต้องส่งลูกบอลไปยังฝั่งตรงข้ามโดยไม่ให้ลูกบอลตกพื้น",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAopskW_bZc0YUcE0qWbicR7FooO06MNV9Wg&usqp=CAU",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "volleyball",
        location_id: volleyballFieldId,
        type_id: netRacketId,
      },
      {
        name: "ปิงปอง",
        main_image:
          "https://stadiumth.s3.ap-southeast-1.amazonaws.com/upload/1615287398380.jpg",
        price: PRICE.REGULAR,
        description: "กีฬาที่ใช้ลูกปิงปองในการเล่น ผู้เล่นต้องใช้การตีลูกปิงปองข้ามมากับผู้เล่นอีกฝ่ายโดยไม่ให้ลูกตกพื้น",
        images: [
          "https://thainews.prd.go.th/dc/transcode/image/2565/7/14/26aca7cc0e2e81542e607920d43d7ccb_small.JPG",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "pingpong",
        location_id: sportClubBuildingId,
        type_id: netRacketId,
      },

      // ทีม/สนาม
      {
        name: "บาสเกตบอล",
        main_image:
          "https://mpics.mgronline.com/pics/Images/565000008904001.JPEG",
        price: PRICE.REGULAR,
        description: "กีฬาที่ใช้ลูกบอลในการเล่น ทีมผู้เล่นต้องพยายามทำคะแนนโดยการโยนลูกบอลเข้าตะกร้าฝั่งตรงข้าม",
        images: [
          "https://www.matichon.co.th/wp-content/uploads/2020/07/53458.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "basketball",
        location_id: inseeChandrasathitStadiumId,
        type_id: teamFieldId,
      },
      // {
      //   name: "ฟุตบอล",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },
      // {
      //   name: "ฮอกกี้",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },
      // {
      //   name: "แฮนด์บอล",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },
      // {
      //   name: "เซปักตะกร้อ",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },
      // {
      //   name: "ซอฟท์บอล",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },
      // {
      //   name: "รักบี้",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },

      // ประกวด
      {
        name: "ยิมนาสติก",
        main_image:
          "https://www.matichon.co.th/wp-content/uploads/2021/10/1-156-scaled.jpg",
        price: PRICE.REGULAR,
        description: "กีฬาที่ผู้เล่นต้องใช้ความแข็งแกร่งและความยืดหยุ่นในการซ้อมและประลองท่าเต้นต่างๆ เพื่อสร้างสรรค์การแสดงที่สวยงาม",
        images: [
          "https://static.thairath.co.th/media/dFQROr7oWzulq5FZUIK2jxJYeeAljAHDS8Md0q0cO6hjNoXyIVbkdA7zBjYRorL8vKi.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "gymnastic",
        location_id: gymnasiumId,
        type_id: competitionId,
      },

      // อื่นๆ
      {
        name: "เปตอง",
        main_image:
          "https://www.thaihealth.or.th/data/content/2017/09/38727/cms/newscms_thaihealth_c_dehiopsyz189.jpg",
        price: PRICE.CHEAP,
        description: "เป็นกีฬาที่มีลักษณะคล้ายกลีบเหล็ก ผู้เล่นจะใช้ลูกโลหะหนักๆ เพื่อโยนให้มาตรฐานและมุ่งหมายไปยังเป้าหมายที่ตั้งไว้บนพื้นดิน การแข่งขันเป็นทีมหรือเดี่ยวกันโดยลูกจะต้องมาตรฐานใกล้ที่สุดกับเป้าหมายหรือส่วนใกล้เคียงเพื่อทำคะแนน มีกติกาเฉพาะที่และยุทธวิธีที่ใช้ในการเล่น",
        images: [
          "https://cdn.chiangmainews.co.th/wp-content/uploads/2022/02/23095449/kl.jpg",
        ],
        open_time: "10:00:00.000Z",
        close_time: "18:30:00.000Z",
        slug: "petanque",
        location_id: inseeChandrasathitStadiumId,
        type_id: otherId,
      },
      // {
      //   name: "บริดจ์",
      //   main_image:
      //     "",
      //   price: PRICE.,
      //   description:
      //     "",
      //   images: [
      //     "",
      //     "",
      //     "",
      //   ],
      //   open_time: "10:00:00.000Z",
      //   close_time: "18:30:00.000Z",
      //   slug: "",
      //   location_id: ,
      //   type_id: ,
      // },
    ],
  });

  const sports = await prisma.sport.findMany();

  // // ลู่ลาน/ความเร็ว
  const swimmingId = sports.find((sport) => sport.name === "ว่ายน้ำ")?.id || 1;
  const archeryId = sports.find((sport) => sport.name === "ยิงธนู")?.id || 1;
  const shootingId = sports.find((sport) => sport.name === "ยิงปืน")?.id || 1;
  const fitnessId = sports.find((sport) => sport.name === "ฟิตเนส")?.id || 1;
  const boxingId = sports.find((sport) => sport.name === "มวย")?.id || 1;
  const thaiSwordId = sports.find((sport) => sport.name === "ดาบไทย")?.id || 1;
  const internationalSwordId =
    sports.find((sport) => sport.name === "ดาบสากล")?.id || 1;
  const karateId = sports.find((sport) => sport.name === "คาราเต้")?.id || 1;
  const judoId = sports.find((sport) => sport.name === "ยูโด")?.id || 1;
  const taekwondoId =
    sports.find((sport) => sport.name === "เทควันโด")?.id || 1;
  const tennisId = sports.find((sport) => sport.name === "เทนนิส")?.id || 1;
  const badmintonId =
    sports.find((sport) => sport.name === "แบดมินตัน")?.id || 1;
  const volleyballId =
    sports.find((sport) => sport.name === "วอลเลย์บอล")?.id || 1;
  const tableTennisId =
    sports.find((sport) => sport.name === "ปิงปอง")?.id || 1;
  const basketballId =
    sports.find((sport) => sport.name === "บาสเกตบอล")?.id || 1;
  const gymnasticId =
    sports.find((sport) => sport.name === "ยิมนาสติก")?.id || 1;
  const petanqueId = sports.find((sport) => sport.name === "เปตอง")?.id || 1;

  await prisma.item.createMany({
    data: [
      {
        name: "เสื้อว่ายน้ำ",
        description: "เสื้อว่ายน้ำ สำหรับว่ายน้ำ",
        price: "$100.00",
        sport_id: swimmingId,
      },
      {
        name: "คันธนู",
        description: "คันธนู สำหรับยิงธนู",
        price: "$100.00",
        sport_id: archeryId,
      },
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
      {
        first_name: "สมหญิง",
        last_name: "หญิงสม",
        text: "สนุกมาก",
        rating: 5,
        sport_id: shootingId,
        user_id: userB.id,
      },
      {
        first_name: "สมหญิง",
        last_name: "หญิงสม",
        text: "สนุกมากๆๆ",
        rating: 2,
        sport_id: fitnessId,
        user_id: userB.id,
      },
      {
        first_name: "สมหมาย",
        last_name: "หมายสม",
        text: "สนุกมาก",
        rating: 5,
        sport_id: boxingId,
        user_id: userC.id,
      },
      {
        first_name: "สมปอง",
        last_name: "ปองกูล",
        text: "สนุกจังเลย",
        rating: 1,
        sport_id: thaiSwordId,
        user_id: userD.id,
      },
      {
        first_name: "สมชาย",
        last_name: "ชายสม",
        text: "สนุกอีกแล้ว",
        rating: 2,
        sport_id: internationalSwordId,
        user_id: userA.id,
      },
      {
        first_name: "สมหญิง",
        last_name: "หญิงสม",
        text: "เบื่อมาก",
        rating: 4,
        sport_id: karateId,
        user_id: userB.id,
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
