import { Product } from './types';

// =====================================================================
// [중요] 이미지 경로 설정 안내
//
// 1. 로컬 컴퓨터에서 실행할 때:
//    - 'goods1.jpg', 'goods2.jpg' 등을 index.html과 같은 폴더에 넣으세요.
//    - 아래 PRODUCTS 배열에서 imageSrc 값을 localFileName으로 변경하면 됩니다.
//      예: imageSrc: './goods1.jpg'
//
// 2. 현재 미리보기 환경:
//    - 이미지가 보이도록 임시로 랜덤 이미지를 연결해두었습니다.
// =====================================================================

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoGePknfpJ9DnWl-fqh_T0TeueILxhRynjsmOBsuY5iN5Vk6Y6ozprtoUvbI_JzhCTYQ/exec";

export const BANK_INFO = {
  name: "카카오뱅크",
  accountNumber: "79422 291245",
  holder: "이홍범"
};

export const SHIPPING_FEE = 3600;

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "b급 감성 노트- A",
    price: 4200,
    localFileName: "goods1.jpg",
    // 실제 사용 시: imageSrc: "./goods1.jpg"
    imageSrc: "https://picsum.photos/400/400?random=1" 
  },
  {
    id: 2,
    name: "b급 감성 노트- B",
    price: 4200,
    localFileName: "goods2.jpg",
    // 실제 사용 시: imageSrc: "./goods2.jpg"
    imageSrc: "https://picsum.photos/400/400?random=2"
  },
  {
    id: 3,
    name: "b급 감성 노트- C",
    price: 4200,
    localFileName: "goods3.jpg",
    // 실제 사용 시: imageSrc: "./goods3.jpg"
    imageSrc: "https://picsum.photos/400/400?random=3"
  },
  {
    id: 4,
    name: "b급 감성 노트- D",
    price: 4200,
    localFileName: "goods4.jpg",
    // 실제 사용 시: imageSrc: "./goods4.jpg"
    imageSrc: "https://picsum.photos/400/400?random=4"
  },
  {
    id: 5,
    name: "네꾸 스티커-뽀용맛",
    price: 2200,
    localFileName: "goods5.jpg",
    // 실제 사용 시: imageSrc: "./goods5.jpg"
    imageSrc: "https://picsum.photos/400/400?random=5"
  },
  {
    id: 6,
    name: "네꾸 스티커-쇠맛",
    price: 2200,
    localFileName: "goods6.jpg",
    // 실제 사용 시: imageSrc: "./goods6.jpg"
    imageSrc: "https://picsum.photos/400/400?random=6"
  },
  {
    id: 7,
    name: "네꾸 스티커-스벅맛",
    price: 2200,
    localFileName: "goods7.jpg",
    // 실제 사용 시: imageSrc: "./goods7.jpg"
    imageSrc: "https://picsum.photos/400/400?random=7"
  },
  {
    id: 8,
    name: "세트 A (네꾸 스티커-쇠맛+ b급 감성 노트-A )",
    price: 6200,
    localFileName: "goods8.jpg",
    // 실제 사용 시: imageSrc: "./goods8.jpg"
    imageSrc: "https://picsum.photos/400/400?random=8"
  },
  {
    id: 9,
    name: "세트 B (네꾸 스티커-뽀용맛+ b급 감성 노트-B)",
    price: 6200,
    localFileName: "goods9.jpg",
    // 실제 사용 시: imageSrc: "./goods9.jpg"
    imageSrc: "https://picsum.photos/400/400?random=9"
  },
  {
    id: 10,
    name: "세트 C (네꾸 스티커-스벅맛+ b급 감성 노트-C)",
    price: 6200,
    localFileName: "goods10.jpg",
    // 실제 사용 시: imageSrc: "./goods10.jpg"
    imageSrc: "https://picsum.photos/400/400?random=10"
  }
];