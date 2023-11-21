import { Component } from "react";
import { Layer } from "recharts";

/** @type {import('tailwindcss').Config} */

export default {
  plugins: [
    function ({ addBase }) {
      addBase({
        h1: {
          fontSize: {
            sm: "1rem",
          },
          color: "#363ABF",
          fontWeight: "700",
        },
        h2: {
          fontSize: {
            sm: "1rem",
          },
          color: "#363ABF",
          fontWeight: "600",
        },
        h3: {
          fontSize: "1rem",
          color: "#363ABF",
          fontWeight: "700",
        },
        h4: {
          fontSize: "0.938rem",
          color: "#363ABF",
          fontWeight: "600",
        },
        h5: {
          fontSize: "1.875rem",
          color: "#000000",
          fontWeight: "400",
        },
        h6: {
          fontSize: "1.125rem",
          color: "#000000",
          fontWeight: "400",
        },
        p: {
          fontSize: "1rem",
          color: "#27293F",
          fontWeight: "400",
        },
        a: {
          color: "#363ABF",
          textDecoration: "none",
          fontSize: "0.85rem",
        },
        "a:hover": {
          color: "#363abf",
        },

        "a:not([href])": {
          color: "#c8d9fd",
        },
      });
    },
  ],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "350px",
      sm: "640px",
      md: "750px",
      lg: "1000px",
      xl: "1280px",
      xxl: "1920px",
    },
    extend: {
      colors: {
        "font-color": "#4B5563",

        "light-main": "#6576ef",
        "main-color": "#363ABF",
        "dark-main": "#2f3480",

        "light-text": "#d1d9ec",
        "medium-text": "#8da1cd",
        "text-color": "#27293F",

        "light-bg": "#eef4ff",
        mainBG: "#FAFAFA",
        "dark-bg": "#363ABF",

        "normal-border": "#E1EAFE",

        barHigh: "#FF0000",
        barMedium: "#FFA500",
        barLow: "#00FF00",
      },
      fontSize: {
        "xs-text": "8px",
        "s-text": "10px",
        "size0-p": "12px",
        "size1-p": "14px",
        "size2-p": "18px",
        "size3-p": "20px",
        "size4-p": "22px",
        "size8-p": "30px",
      },
      fontWeight: {
        "light-p": 300,
        "medium-p": 500,
        "semi-p": 600,
        "heavy-p": 700,
        "xl-p": 800,
      },
      maxWidth: {
        "xs-mini": "50px",
        "n-mini": "100px",
        "xl-mini": "150px",
      },
      boxShadow: {
        custom: "0px 0px 5px 4px rgba(0,0,0,0.05)",
      },
      margin: {
        25: "7rem",
        26: "8rem",
        27: "9rem",
        28: "10rem",
        29: "11rem",
        30: "12rem",
        31: "13rem",
        32: "14rem",
        33: "15rem",
        34: "16rem",
        35: "17rem",
        36: "18rem",
        37: "19rem",
        38: "20rem",
        39: "21rem",
        40: "22rem",
        41: "23rem",
        42: "24rem",
        43: "25rem",
        44: "26rem",
        45: "27rem",
        46: "28rem",
        47: "29rem",
        48: "30rem",
        49: "31rem",
        50: "31rem",
        51: "33rem",
        52: "34rem",
        53: "35rem",
        54: "36rem",
        55: "37rem",
        56: "38rem",
        57: "39rem",
        58: "40rem",
        59: "41rem",
        60: "42rem",
        61: "43rem",
        62: "44rem",
        63: "45rem",
        64: "46rem",
        65: "47rem",
        66: "48rem",
        67: "49rem",
        68: "50rem",
        69: "51rem",
        70: "52rem",
        71: "53rem",
        72: "54rem",
        73: "55rem",
        74: "56rem",
        75: "57rem",
        76: "58rem",
        77: "59rem",
        78: "60rem",
        79: "61rem",
        80: "62rem",
        81: "63rem",
        82: "64rem",
        83: "65rem",
        84: "66rem",
        85: "67rem",
        86: "68rem",
        87: "69rem",
        88: "70rem",
        89: "71rem",
        90: "72rem",
        91: "73rem",
        92: "74rem",
        93: "75rem",
        94: "76rem",
        95: "77rem",
        96: "78rem",
        97: "79rem",
        98: "80rem",
        99: "81rem",
        100: "82rem",
        101: "83rem",
        102: "84rem",
        103: "85rem",
        104: "86rem",
        105: "87rem",
        106: "88rem",
        107: "89rem",
        108: "90rem",
        109: "50rem",
      },
    },
  },
};
