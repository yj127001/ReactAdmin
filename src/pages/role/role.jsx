import React, { Component } from 'react'
import SwiperCore, { Navigation, Pagination, Autoplay, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./role.less";
import img1 from './images/1.jpeg';
import img2 from './images/2.jpeg';
import img3 from './images/3.jpeg';
import img4 from './images/4.jpeg';
import img5 from './images/5.jpeg';
import img6 from './images/6.jpeg';
import img7 from './images/7.jpeg';
import img8 from './images/8.jpeg';
SwiperCore.use([Navigation, Pagination, Autoplay, Thumbs]);

export default class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
          swiper: null,
          swiperThumb: null,
          activeIndex: 0,
        };
      }
    render() {
        const { imgs = [ img1, img2, img3, img4, img5, img6, img7, img8] } = this.props;
        const { activeIndex } = this.state;
        return (
            <div className="picsBox">
                <div className="picsBig">
                    <Swiper
                        autoplay
                        navigation
                        loopedSlides={5}
                        className="swiperBox"
                        pagination={{
                        type: "fraction",
                        }}
                        thumbs={{ swiper: this.state?.swiperThumb }}
                        onSlideChange={(swiper) => {
                        this.setState({ activeIndex: swiper?.activeIndex });
                        this.state?.swiperThumb.slideTo(swiper?.activeIndex);
                        }}
                        onSwiper={(swiper) => this.setState({ swiper })}
                    >
                        {imgs.map((imgInfo, index) => {
                        return (
                            <SwiperSlide key={index}>
                            <img src={imgInfo} className="imgBox" />
                            </SwiperSlide>
                        );
                        })}
                    </Swiper>
                </div>
                <div className="picsList">
                    <Swiper
                        onSwiper={(swiperThumb) => this.setState({ swiperThumb })}
                        className="swiperBoxThumb"
                        spaceBetween={16}
                        slidesPerView={4}
                        freeMode={true}
                        direction={"horizontal"}
                        watchSlidesVisibility={true}
                        watchSlidesProgress={true}
                    >
                        {imgs.map((imgInfo, index) => {
                            return (
                                <SwiperSlide key={index} className="swiperBoxThumbSlide">
                                    {activeIndex !== index ? (
                                        <div className="mask"></div>
                                    ) : null}
                                    <img src={imgInfo} className="thumbImg" />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        );
    }
}
