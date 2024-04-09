import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import customAxios from '../store/customAxios';

const Slider2 = () => {
    const sliderRef1 = useRef(); // 첫 번째 슬라이더 ref
    const data = [
        {
            productId: 1,
            productRepresentativeImage:
                'https://media.istockphoto.com/id/1488611158/ko/%EC%82%AC%EC%A7%84/%EC%B6%94%EC%83%81%EC%A0%81-%EC%9D%B8-%EB%B0%B0%EA%B2%BD%EC%9D%84%EC%9C%84%ED%95%9C-%EC%A0%88%EB%AC%98%ED%95%9C-%EB%8F%85%EC%B0%BD%EC%A0%81-%EC%9D%B8-%EA%B7%B8%EB%A6%BC%EC%9D%98-%EB%8C%80%EB%A6%AC%EC%84%9D-%EC%9E%89%ED%81%AC-%EC%B6%94%EC%83%81-%EC%98%88%EC%88%A0.jpg?s=612x612&w=0&k=20&c=EY8pMKXcSA8-K6N0P8YMlBuEbD7lkvfLdof9sIkUYxw=',
        },
        {
            productId: 2,
            productRepresentativeImage:
                'https://media.istockphoto.com/id/1049447092/ko/%EC%82%AC%EC%A7%84/%EC%84%B8%EB%B6%80-%EC%82%AC%ED%95%AD-%EC%BA%94%EB%B2%84%EC%8A%A4%EC%97%90-%EC%98%A4%EC%9D%BC-%ED%8E%98%EC%9D%B8%ED%8A%B8.jpg?s=612x612&w=0&k=20&c=GlSG4Cikg0gBxOITajzZBuFA6kCi6kVWa-4Y3mnEYtM=',
        },
        {
            productId: 3,
            productRepresentativeImage:
                'https://media.istockphoto.com/id/1465622045/ko/%EC%82%AC%EC%A7%84/%EC%A2%85%EC%9D%B4%EC%97%90-%EA%B7%B8%EB%A0%A4%EC%A7%84-%EB%8C%80%EB%A6%AC%EC%84%9D-%EC%95%A1%EC%B2%B4-%EC%9E%89%ED%81%AC-%EC%95%84%ED%8A%B8-%EA%B7%B8%EB%A6%BC%EC%9D%98-%EC%96%B4%EB%91%90%EC%9A%B4-%EA%B8%88-%EC%B6%94%EC%83%81%EC%A0%81%EC%9D%B8-%EB%B0%B0%EA%B2%BD-%EA%B3%A0%ED%92%88%EC%A7%88-%EC%A2%85%EC%9D%B4-%EC%A7%88%EA%B0%90%EC%97%90-%EC%9B%90%EB%B3%B8-%EC%9E%91%ED%92%88-%EC%88%98%EC%B1%84%ED%99%94-%EC%95%8C%EC%BD%94%EC%98%AC-%EC%9E%89%ED%81%AC-%ED%8E%98%EC%9D%B8%ED%8A%B8%EC%9D%98-%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg?s=612x612&w=0&k=20&c=n0HkGpE6tbhutwoV9gxNoM__-Dx9-daxYdrtV_Z0hzY=',
        },
        {
            productId: 4,
            productRepresentativeImage:
                'https://media.istockphoto.com/id/1702344967/ko/%EC%82%AC%EC%A7%84/%EB%B0%9D%EC%9D%80-%ED%9A%8C%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%98%90%EB%8A%94-%EB%B8%8C%EB%9E%9C%EB%94%A9%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B3%B5%EA%B0%84%EC%9D%B4-%EC%9E%88%EB%8A%94-%EB%8B%A4%EC%83%89-%EC%9B%90%ED%98%95-%EA%B7%B8%EB%A6%AC%EB%93%9C-%ED%98%95%EC%84%B1-3d-%EA%B8%B0%EC%88%A0-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=5aNnxEhwI9mYBd_b_S3wOmh3uRWUXE7eAOnJVijysZ4=',
        },
        {
            productId: 5,
            productRepresentativeImage:
                'https://media.istockphoto.com/id/916789570/ko/%EC%82%AC%EC%A7%84/%EA%B7%B8%EB%9F%B0%EC%A7%80-%EB%B0%B0%EA%B2%BD-space-for-text-%EB%98%90%EB%8A%94-%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg?s=612x612&w=0&k=20&c=_WLaRoTVYz0WiwEHWdKC6RYzK9bnVzwp9oFSmvKit2c=',
        },
        {
            productId: 6,
            productRepresentativeImage:
                'https://media.istockphoto.com/id/1226232663/ko/%EC%82%AC%EC%A7%84/%EC%8B%9C%EB%A9%98%ED%8A%B8-%EB%B0%94%EB%8B%A5%EA%B3%BC-%EA%B2%80%EC%9D%80-%EB%B2%BD-%EB%B0%B0%EA%B2%BD-%EB%B9%88-%EB%B0%A9-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4-%EB%94%94%EC%8A%A4%ED%94%8C%EB%A0%88%EC%9D%B4-%EC%A0%9C%ED%92%88%EC%97%90-%EC%82%AC%EC%9A%A9.jpg?s=612x612&w=0&k=20&c=Z3ddDI9pTTGMiDQNqSSJyv5DJsQYXugDNhfKii7MiLc=',
        },
        // 필요한 만큼 이미지 데이터를 추가해주세요
    ];
    // const [data, setData] = useState([]);
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     customAxios
    //         .get('/api/products/main?type=POPULARITY')
    //         .then((response) => {
    //             setData(response.data);
    //             //  console.log('카테고리슬라이더내부 리스폰스성공')
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             //  console.log('카테고리슬라이더내부 에러')
    //         });
    // }, []);

    // console.log(apiData.length)
    const doubleData = [...data, ...data, ...data];

    const halfIndex = Math.ceil(doubleData.length / 2);
    const firstHalf = doubleData.slice(0, halfIndex);
    const secondHalf = doubleData.slice(halfIndex);
    console.log(firstHalf);
    console.log(secondHalf);

    const navigate = useNavigate();
    const goToProductDetail = (id) => {
        navigate(`/productdetail/${id}`);
    };

    const settings1 = {
        slidesToShow: 10,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 2000,
        cssEase: 'linear',
        infinite: true,
        focusOnSelect: false,
        arrows: false,
    };

    const settings2 = {
        slidesToShow: 10,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 4000,
        cssEase: 'linear',
        infinite: true,
        focusOnSelect: false,
        arrows: false,
    };

    return (
        <div id="slider1" className="  text-white justify-center  h-[300px] overflow-hidden">
            {/* 첫 번째 슬라이더 */}
            <div className=" w-[1200px] h-[140px]">
                <Slider {...settings1} className="">
                    {firstHalf.map((item, idx) => (
                        <div key={idx} className="h-[120px]  ">
                            <img
                                src={item.productRepresentativeImage}
                                alt={`ProductId ${item.productId}`}
                                className=" object-fit h-[120px] w-[90px] rounded-2xl  cursor-pointer "
                                onClick={() => goToProductDetail(item.productId)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div style={{ textAlign: 'center' }}></div>

            {/* 두 번째 슬라이더 */}
            <div className=" w-[1200px] h-[140px] ">
                <Slider {...settings2} className="right-[45px]">
                    {secondHalf.map((item, idx) => (
                        <div key={idx} className="h-[120px]  ">
                            <img
                                src={item.productRepresentativeImage}
                                alt={`ProductId ${item.productId}`}
                                className=" object-fit h-[120px] w-[90px]  rounded-2xl  cursor-pointer"
                                onClick={() => goToProductDetail(item.productId)}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Slider2;
