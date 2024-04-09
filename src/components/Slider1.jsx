import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import customAxios from '../store/customAxios';

//메인화면 첫번째 슬라이더

const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-[50%] left-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
            onClick={onClick}
        >
            <BsChevronCompactLeft />
        </div>
    );
};

const NextArrow = ({ onClick }) => {
    return (
        <div
            className="absolute top-[50%] right-[-50px] transform -translate-y-1/2 cursor-pointer z-10 text-4xl"
            onClick={onClick}
        >
            <BsChevronCompactRight />
        </div>
    );
};

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5, // 한 화면에 보여질 슬라이드 수 (1로 설정)
    slidesToScroll: 1, // 한번에 스크롤할 슬라이드 수 (1로 설정)
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    accessibility: true,
    draggable: true,
    initialSlide: 1, // 시작 슬라이드 설정 (가운데 큰 슬라이드 중 하나)
    centerMode: true, // 가운데 모드 활성화
    centerPadding: '0',
    lazyLoad: true,
    autoplay: true,
    autoplayspeed: 5000,
};

function SlideMain() {
    const data = [
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1443499613/ko/%EC%82%AC%EC%A7%84/%EC%A7%84-%EC%BD%9C%EB%9D%BC%EC%A3%BC-%ED%92%8D%EA%B2%BD-%EC%A2%85%EC%9D%B4-%EC%98%88%EC%88%A0.webp?b=1&s=170667a&w=0&k=20&c=zCCiISrWfdgFmmoNYymB1LBMzawUpmjNldeHTi7TJyI=',
            title: '1',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1444763764/ko/%EC%82%AC%EC%A7%84/%EC%95%84%ED%81%AC%EB%A6%B4-%ED%8E%98%EC%9D%B8%ED%8A%B8-%EC%BA%94%EB%B2%84%EC%8A%A4.webp?b=1&s=170667a&w=0&k=20&c=RXzj08ogkkXDd4AE93yjeJcSrXW9Ui_rI-12M9oaHsA=',
            title: '2',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1457578203/ko/%EC%82%AC%EC%A7%84/%EC%B6%94%EC%83%81%EC%A0%81%EC%9D%B8-%EC%A7%88%EA%B0%90-%EC%8B%9C%EB%A9%98%ED%8A%B8-%EA%B7%B8%EB%A6%BC-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=-Yr_eyWYgLmHLhnSDClLXVbZA00wEfuJ1qnFQY0Bhqw=',
            title: '3',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1319763475/ko/%EC%82%AC%EC%A7%84/%EC%99%84%EB%B2%BD%ED%95%9C-%ED%81%B4%EB%9E%98%EC%8B%9D-%ED%95%9C-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9D%84%EC%9C%84%ED%95%9C-%EC%B6%94%EC%83%81%ED%99%94.jpg?s=612x612&w=0&k=20&c=MJcwHoKyJCuax1_KKziKMwo8djD847ikTUJ4q9CKG_E=',
            title: '4',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1091758300/ko/%EC%82%AC%EC%A7%84/%EC%9E%89%ED%81%AC-%EC%A2%85%EC%9D%B4-%EC%A7%88%EA%B0%90-%EA%B2%80%EC%9D%80-%ED%9A%8C%EC%83%89-%EA%B8%88-%EB%8C%80%EB%A6%AC%EC%84%9D.jpg?s=612x612&w=0&k=20&c=Ip-YsfVLECdE3ksGfiM47hXA84osg5U0KfgxJop42Tc=',
            title: '5',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1185078539/ko/%EC%82%AC%EC%A7%84/%EC%B6%94%EC%83%81-%ED%91%9C%ED%98%84-%EB%B8%94%EB%9E%99-%EC%88%98%EC%B1%84%ED%99%94-%EC%96%BC%EB%A3%A9.jpg?s=612x612&w=0&k=20&c=aVFvDl5jA_ruUOQ0IIDINYpxI-t3n9V7Rg4cyE4fDdY=',
            title: '6',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1182363990/ko/%EC%82%AC%EC%A7%84/%ED%99%A9%EA%B8%88-%ED%8C%8C%EB%8F%84%EC%99%80-%EA%B3%B1%EC%8A%AC-%EB%A8%B8%EB%A6%AC%EC%99%80-%EA%B2%80%EC%9D%80-%EB%8C%80%EB%A6%AC%EC%84%9D-%EB%B0%B0%EA%B2%BD%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%B6%94%EC%83%81%EB%B0%B0%EA%B2%BD%EB%98%90%EB%8A%94%ED%85%8D%EC%8A%A4%EC%B2%98-%EC%95%84%ED%81%AC%EB%A6%B4-%EC%9C%A0%EC%B2%B4-%EC%98%88%EC%88%A0.jpg?s=612x612&w=0&k=20&c=8uXOfU6wr4_l4g8J_QNMBLddcy2EJ5JWoYEE9CCe4jg=',
            title: '7',
        },
        {
            id: 1,
            imageUrl:
                'https://media.istockphoto.com/id/1226232663/ko/%EC%82%AC%EC%A7%84/%EC%8B%9C%EB%A9%98%ED%8A%B8-%EB%B0%94%EB%8B%A5%EA%B3%BC-%EA%B2%80%EC%9D%80-%EB%B2%BD-%EB%B0%B0%EA%B2%BD-%EB%B9%88-%EB%B0%A9-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4-%EB%94%94%EC%8A%A4%ED%94%8C%EB%A0%88%EC%9D%B4-%EC%A0%9C%ED%92%88%EC%97%90-%EC%82%AC%EC%9A%A9.jpg?s=612x612&w=0&k=20&c=Z3ddDI9pTTGMiDQNqSSJyv5DJsQYXugDNhfKii7MiLc=',
            title: '8',
        },

        // 필요한 만큼 이미지 데이터를 추가해주세요
    ];
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     // console.log('위치: 슬라이드메인')
    //     customAxios
    //         .get('/api/products/main?type=POPULARITY')
    //         .then((response) => {
    //             const array = response.data;
    //            //  console.log('위치: 슬라이드1', array);

    //             setData(array);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }, []);

    const navigate = useNavigate();
    const goToProductDetail = (id) => {
        navigate(`/productdetail/${id}`);
    };

    return (
        <div id="slider1" className="  p-4 text-white justify-center">
            <Slider {...settings}>
                {data.map((image, idx) => (
                    <div key={idx}>
                        <img
                            src={image.imageUrl}
                            alt={`ProductId ${image.productId}`}
                            className=" object-fit h-[230px] w-[180px] pr-2 rounded-3xl cursor-pointer"
                            onClick={() => goToProductDetail(image.productId)}
                        />
                        {image.title}
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SlideMain;
