import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleStatus } from '../../articles/enums/article-status.enum';

@Injectable()
export class ArticleSeeder {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async seed(): Promise<void> {
    console.log('🌱 Seeding articles...');
    
    // 기존 데이터 삭제
    await this.articleRepository.clear();
    
    const articles = this.generateMockArticles(500);
    
    // 배치 삽입
    const batchSize = 50;
    for (let i = 0; i < articles.length; i += batchSize) {
      const batch = articles.slice(i, i + batchSize);
      await this.articleRepository.save(batch);
      console.log(`✅ Inserted ${i + batch.length}/${articles.length} articles`);
    }
    
    console.log('🎉 Seeding completed!');
  }

  private generateMockArticles(count: number): Partial<Article>[] {
    const articles: Partial<Article>[] = [];
    
    interface ProductItem {
      name: string;
      priceRange: [number, number];
    }
    
    const productData: Record<string, ProductItem[]> = {
      '디지털기기': [
        { name: '애플워치 7 45mm GPS 스페이스그레이', priceRange: [300000, 500000] },
        { name: '아이패드 에어 5세대 64GB WiFi', priceRange: [600000, 800000] },
        { name: '갤럭시 버즈2 프로 미개봉', priceRange: [150000, 250000] },
        { name: '맥북 프로 14인치 M3 실버', priceRange: [2000000, 2500000] },
        { name: '에어팟 프로 2세대 정품', priceRange: [250000, 350000] },
        { name: '갤럭시 S24 울트라 256GB', priceRange: [1200000, 1500000] },
        { name: '아이폰 15 프로맥스 256GB 자연색', priceRange: [1500000, 1800000] },
        { name: '소니 WH-1000XM5 노이즈캔슬링 헤드폰', priceRange: [350000, 450000] },
        { name: '닌텐도 스위치 OLED 화이트', priceRange: [350000, 400000] },
        { name: '플레이스테이션5 디스크 에디션', priceRange: [500000, 600000] },
      ],
      '가구/인테리어': [
        { name: '이케아 말름 서랍장 6단 화이트', priceRange: [80000, 150000] },
        { name: '무인양품 원목 책상 140cm', priceRange: [200000, 350000] },
        { name: '한샘 3인용 패브릭 소파 그레이', priceRange: [400000, 600000] },
        { name: '일룸 시디즈 T50 의자', priceRange: [150000, 250000] },
        { name: '까사미아 4인 원목 식탁', priceRange: [300000, 500000] },
        { name: '템퍼 매트리스 퀸사이즈', priceRange: [800000, 1200000] },
        { name: '이케아 빌리 책장 화이트', priceRange: [50000, 100000] },
        { name: '무인양품 수납장 3단', priceRange: [100000, 200000] },
        { name: '리바트 옷장 슬라이딩도어', priceRange: [300000, 500000] },
        { name: '디자인체어 레플리카', priceRange: [80000, 150000] },
      ],
      '생활/주방': [
        { name: '다이슨 V15 무선청소기 풀세트', priceRange: [600000, 800000] },
        { name: '발뮤다 토스터기 화이트', priceRange: [200000, 300000] },
        { name: '쿠쿠 10인용 전기압력밥솥', priceRange: [150000, 250000] },
        { name: 'LG 디오스 정수기 렌탈이전', priceRange: [100000, 200000] },
        { name: '네스프레소 버츄오 캡슐머신', priceRange: [150000, 250000] },
        { name: '삼성 비스포크 에어드레서', priceRange: [800000, 1200000] },
        { name: '브레빌 에스프레소 머신', priceRange: [400000, 600000] },
        { name: '휴롬 원액기 슬로우주서', priceRange: [200000, 350000] },
        { name: '쿠진아트 에어프라이어 오븐', priceRange: [150000, 250000] },
        { name: '다이슨 에어랩 스타일러', priceRange: [500000, 700000] },
      ],
      '유아동': [
        { name: '스토케 트립트랩 하이체어', priceRange: [200000, 300000] },
        { name: '부가부 비5 유모차', priceRange: [800000, 1200000] },
        { name: '맥시코시 카시트 신생아용', priceRange: [300000, 500000] },
        { name: '아이쿠 전동 바운서', priceRange: [150000, 250000] },
        { name: '팸퍼스 프리미엄 기저귀 대형 8박스', priceRange: [200000, 300000] },
        { name: '레고 테크닉 42131', priceRange: [400000, 500000] },
        { name: '실바니안 패밀리 하우스 세트', priceRange: [100000, 200000] },
        { name: '삼천리 아동 자전거 20인치', priceRange: [150000, 250000] },
        { name: '그라코 유아 식탁의자', priceRange: [80000, 150000] },
        { name: '아가방 아기침대 원목', priceRange: [300000, 500000] },
      ],
      '의류': [
        { name: '노스페이스 눕시 패딩 95사이즈', priceRange: [250000, 350000] },
        { name: '나이키 에어맥스 270 새상품 280', priceRange: [120000, 180000] },
        { name: '스톤아일랜드 맨투맨 L사이즈', priceRange: [200000, 300000] },
        { name: '캐나다구스 익스페디션 파카 M', priceRange: [800000, 1200000] },
        { name: '발렌시아가 스피드러너 42', priceRange: [600000, 800000] },
        { name: '구찌 에이스 스니커즈 270', priceRange: [400000, 600000] },
        { name: '몽클레어 롱패딩 여성 1사이즈', priceRange: [1500000, 2000000] },
        { name: '버버리 트렌치코트 남성 100', priceRange: [1000000, 1500000] },
        { name: '프라다 사피아노 가방', priceRange: [1200000, 1800000] },
        { name: '에르메스 켈리백 25', priceRange: [8000000, 12000000] },
      ],
      '도서': [
        { name: '2024 토익 기출문제집 풀세트', priceRange: [30000, 50000] },
        { name: '해커스 토플 교재 전권', priceRange: [40000, 60000] },
        { name: '수능 개념원리 수학 전과목', priceRange: [50000, 80000] },
        { name: '한국사능력검정시험 기본서', priceRange: [20000, 35000] },
        { name: '파이썬 코딩 교재 5권 세트', priceRange: [60000, 90000] },
        { name: '해리포터 영문판 전권', priceRange: [100000, 150000] },
        { name: '미움받을 용기 시리즈', priceRange: [25000, 40000] },
        { name: '삼국지 완역본 10권', priceRange: [80000, 120000] },
        { name: '공무원 기본서 행정학개론', priceRange: [30000, 45000] },
        { name: '웹툰 단행본 전권 세트', priceRange: [50000, 100000] },
      ],
      '스포츠': [
        { name: '자이언트 로드자전거 2022년식', priceRange: [800000, 1200000] },
        { name: '아디다스 요가매트 6mm TPE', priceRange: [30000, 50000] },
        { name: '윌슨 테니스 라켓 프로스태프', priceRange: [150000, 250000] },
        { name: '나이키 런닝화 페가수스 40', priceRange: [130000, 180000] },
        { name: '데카트론 캠핑 텐트 4인용', priceRange: [200000, 350000] },
        { name: '살로몬 등산화 GTX 275', priceRange: [180000, 250000] },
        { name: '미즈노 배구화 웨이브', priceRange: [120000, 160000] },
        { name: '타이틀리스트 골프채 풀세트', priceRange: [1500000, 2500000] },
        { name: '멜킨 헬스 덤벨 세트 20kg', priceRange: [80000, 120000] },
        { name: '버튼 스노우보드 세트', priceRange: [400000, 600000] },
      ],
      '게임': [
        { name: 'PS5 호라이즌 포비든 웨스트', priceRange: [40000, 60000] },
        { name: '닌텐도 스위치 젤다의 전설', priceRange: [50000, 70000] },
        { name: 'Xbox 시리즈X 헤일로 에디션', priceRange: [500000, 700000] },
        { name: '스팀덱 OLED 512GB', priceRange: [800000, 1000000] },
        { name: '로지텍 G PRO 게이밍 키보드', priceRange: [150000, 200000] },
        { name: '레이저 데스에더 V3 마우스', priceRange: [180000, 250000] },
        { name: 'PS5 듀얼센스 컨트롤러', priceRange: [80000, 100000] },
        { name: '닌텐도 프로 컨트롤러', priceRange: [70000, 90000] },
        { name: '아케이드 스틱 파이팅 에지', priceRange: [200000, 300000] },
        { name: '게이밍 의자 시크릿랩', priceRange: [400000, 600000] },
      ],
      '반려동물용품': [
        { name: '펫노리 고양이 캣타워 대형', priceRange: [150000, 250000] },
        { name: '강아지 자동급식기 스마트', priceRange: [80000, 120000] },
        { name: '펫츠루트 강아지 유모차', priceRange: [100000, 200000] },
        { name: '고양이 화장실 자동 청소', priceRange: [300000, 500000] },
        { name: '강아지 드라이룸 중형견용', priceRange: [200000, 350000] },
        { name: '펫 공기청정기 LG 퓨리케어', priceRange: [400000, 600000] },
        { name: '고양이 정수기 세라믹', priceRange: [50000, 80000] },
        { name: '강아지 카시트 안전벨트 포함', priceRange: [80000, 150000] },
        { name: '펫 미용 가위 세트 전문가용', priceRange: [100000, 180000] },
        { name: '대형견 켄넬 하우스', priceRange: [200000, 400000] },
      ],
    };

    const locations = [
      '강남구 역삼동',
      '강남구 삼성동',
      '강남구 청담동',
      '서초구 서초동',
      '서초구 반포동',
      '송파구 잠실동',
      '송파구 문정동',
      '마포구 상암동',
      '마포구 합정동',
      '용산구 이태원동',
      '용산구 한남동',
      '성동구 성수동',
      '광진구 건대입구',
      '종로구 혜화동',
      '중구 명동',
      '강서구 마곡동',
      '영등포구 여의도동',
      '노원구 중계동',
      '은평구 응암동',
      '동작구 사당동',
    ];

    const descriptions = [
      '깨끗하게 사용했습니다. 직거래 환영합니다.',
      '새 제품입니다. 선물 받았는데 사용하지 않아서 판매합니다.',
      '급하게 처분합니다. 가격 조정 가능합니다.',
      '이사 가게 되어서 판매합니다. 상태 매우 좋습니다.',
      '사용감 거의 없습니다. 박스, 설명서 모두 있습니다.',
      '정품입니다. 구매 영수증 있습니다.',
      '한 달 정도 사용했습니다. 하자 없습니다.',
      '업그레이드하면서 판매합니다. 관심 있으신 분 연락주세요.',
      '선물용으로 좋습니다. 포장 가능합니다.',
      '실사용 3개월 정도입니다. 에눌 가능합니다.',
    ];

    for (let i = 0; i < count; i++) {
      const category = this.getRandomElement(Object.keys(productData));
      const products = productData[category];
      const product = this.getRandomElement(products);
      const location = this.getRandomElement(locations);
      const description = this.getRandomElement(descriptions);
      const status = this.getRandomElement(Object.values(ArticleStatus));
      
      // 가격 범위 내에서 랜덤 가격 생성 (천원 단위로 반올림)
      const price = Math.round(
        (Math.random() * (product.priceRange[1] - product.priceRange[0]) + product.priceRange[0]) / 1000
      ) * 1000;
      
      // picsum.photos의 랜덤 ID 생성 (1-1000 사이)
      const imageId = Math.floor(Math.random() * 1000) + 1;
      
      articles.push({
        title: product.name,
        price,
        location,
        imageUrl: `https://picsum.photos/id/${imageId}/400/400`,
        likeCount: Math.floor(Math.random() * 100),
        chatCount: Math.floor(Math.random() * 50),
        status,
        category,
        description: `${description} ${product.name}의 상태는 매우 좋습니다.`,
        userId: `user_${Math.floor(Math.random() * 100) + 1}`,
        userName: `판매자${Math.floor(Math.random() * 100) + 1}`,
      });
    }

    return articles;
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}