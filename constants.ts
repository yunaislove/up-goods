import { Product } from './types';

// =====================================================================
// [이미지 경로 설정 안내]
//
// 사용자 제공 호스팅 이미지 URL을 직접 적용했습니다.
// 로컬 파일 없이도 이미지가 바로 보입니다.
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
    imageSrc: "https://i.ifh.cc/F9bhdk.jpg"
  },
  {
    id: 2,
    name: "b급 감성 노트- B",
    price: 4200,
    localFileName: "goods2.jpg",
    imageSrc: "https://i.ifh.cc/27R7hl.jpg"
  },
  {
    id: 3,
    name: "b급 감성 노트- C",
    price: 4200,
    localFileName: "goods3.jpg",
    imageSrc: "https://i.ifh.cc/yRSCsS.jpg"
  },
  {
    id: 4,
    name: "b급 감성 노트- D",
    price: 4200,
    localFileName: "goods4.jpg",
    imageSrc: "https://i.ifh.cc/mHzMol.jpg"
  },
  {
    id: 5,
    name: "네꾸 스티커-뽀용맛",
    price: 2200,
    localFileName: "goods5.jpg",
    imageSrc: "https://i.ifh.cc/Pavthq.jpg"
  },
  {
    id: 6,
    name: "네꾸 스티커-쇠맛",
    price: 2200,
    localFileName: "goods6.jpg",
    imageSrc: "https://i.ifh.cc/qrKMhw.jpg"
  },
  {
    id: 7,
    name: "네꾸 스티커-스벅맛",
    price: 2200,
    localFileName: "goods7.jpg",
    imageSrc: "https://i.ifh.cc/yzMYzG.jpg"
  },
  {
    id: 8,
    name: "세트 A (네꾸 스티커-쇠맛+ b급 감성 노트-A )",
    price: 6200,
    localFileName: "goods8.jpg",
    imageSrc: "https://i.ifh.cc/m1PT4T.jpg"
  },
  {
    id: 9,
    name: "세트 B (네꾸 스티커-뽀용맛+ b급 감성 노트-B)",
    price: 6200,
    localFileName: "goods9.jpg",
    imageSrc: "https://i.ifh.cc/F3lJsb.jpg"
  },
  {
    id: 10,
    name: "세트 C (네꾸 스티커-스벅맛+ b급 감성 노트-C)",
    price: 6200,
    localFileName: "goods10.jpg",
    imageSrc: "https://i.ifh.cc/Ah1DFK.jpg"
  }
];