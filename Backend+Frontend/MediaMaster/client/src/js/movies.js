import avengersImage from "../images/movies/Avengers-endgame.jpg";
import deadpoolImage from "../images/movies/deadpool-3.jpg";
import doctorStrangeImage from "../images/movies/doctor-strange.jpg";
import marvel from "../images/movies/Marvel.webp";

const movies = [
  {
    title: "Marvel",
    src: marvel,
    items: [
      {
        title: "Avengers: Endgame",
        year: 2019,
        src: avengersImage,
      },
      {
        title: "Deadpool and Wolverine",
        year: 1999,
        src: deadpoolImage,
      },
      {
        title: "Doctor Strange",
        year: 2014,
        src: doctorStrangeImage,
      },
    ],
  },
  {
    title: "Transformers",
    src: "https://wallpapercave.com/wp/wp2255168.jpg", // Add an image for the Transformers category if you have one
    items: [
      {
        title: "Transformers",
        year: 2007,
        src: "https://www.google.com/search?sca_esv=a5db118e05c2ad26&sxsrf=ADLYWIK24eZ6xNrUmSo8sxEldTKue8nisQ:1728227149291&q=transformers+2007+Image&udm=2&fbs=AEQNm0BHF5yJVDFU_y7O4KklOYK5E_mvqSkXrfIltAfaylV2o2eYlGkZD_mE7G9mtfzX2OSToo-3FySWOxBn7UYrQyJFCHEaiNdwn9VgMu6rmdxo1oNB1idunAPk16T57E2DYYCwwr-ABZkDE6PFkXjTIwukihwq6d9Po16ROZ8-MlC-hXf33q0w4v0LCPL1WEUD4QhZdkePObVMKbpiyasko9Dm7W8WBw&sa=X&ved=2ahUKEwjejszqg_qIAxXgUqQEHe0SOq4QtKgLegQIDhAB&biw=1920&bih=945&dpr=1#vhid=yLcK53jOyi9xsM&vssid=mosaic", // Image for the 2007 movie
      },
      {
        title: "Transformers: Revenge of the Fallen",
        year: 2009,
        src: "https://www.google.com/search?q=Transformers%3A+Revenge+of+the+Fallen&sca_esv=a5db118e05c2ad26&udm=2&biw=1920&bih=945&sxsrf=ADLYWII6Dm-3TDJB9PmNARnGh1HeK3SFZA%3A1728227150711&ei=TqcCZ4aIK7eakdUPj5bmuQs&ved=0ahUKEwiG56Lrg_qIAxU3TaQEHQ-LObcQ4dUDCBA&uact=5&oq=Transformers%3A+Revenge+of+the+Fallen&gs_lp=Egxnd3Mtd2l6LXNlcnAiI1RyYW5zZm9ybWVyczogUmV2ZW5nZSBvZiB0aGUgRmFsbGVuMgQQIxgnMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESJcJUNgDWNgDcAN4AJABAJgBf6ABf6oBAzAuMbgBA8gBAPgBAvgBAZgCBKAChgHCAgQQABgemAMAiAYBkgcDMy4xoAfuBw&sclient=gws-wiz-serp#vhid=-JN5UfddSCU_uM&vssid=mosaic", // Image for the 2009 movie
      },
      {
        title: "Transformers: Dark of the Moon",
        year: 2011,
        src: "https://www.google.com/search?q=Transformers%3A+Dark+of+the+Moon&sca_esv=a5db118e05c2ad26&udm=2&biw=1920&bih=945&sxsrf=ADLYWILDhpgHJj73KcS0toh8xP1kY-yqzw%3A1728227182471&ei=bqcCZ56-HMb4kdUPi-kS&ved=0ahUKEwierbX6g_qIAxVGfKQEHYu0BAAQ4dUDCBA&uact=5&oq=Transformers%3A+Dark+of+the+Moon&gs_lp=Egxnd3Mtd2l6LXNlcnAiHlRyYW5zZm9ybWVyczogRGFyayBvZiB0aGUgTW9vbjIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI3AhQpQVYpQVwA3gAkAEAmAF9oAF9qgEDMC4xuAEDyAEA-AEC-AEBmAIEoAKGAcICBBAjGCfCAgYQABgHGB6YAwCIBgGSBwMzLjGgB7QE&sclient=gws-wiz-serp#vhid=5NTBL4IMNDCSxM&vssid=mosaic", // Image for the 2011 movie
      },
      {
        title: "Transformers: Age of Extinction",
        year: 2014,
        src: "https://www.google.com/search?q=Transformers%3A+Age+of+Extinction&sca_esv=a5db118e05c2ad26&udm=2&biw=1920&bih=945&sxsrf=ADLYWIL8zrggdhkrGEj6LtwGA1wM9aVo9w%3A1728227206454&ei=hqcCZ6m0G82mkdUPl66EwAU&ved=0ahUKEwipj-2FhPqIAxVNU6QEHRcXAVgQ4dUDCBA&uact=5&oq=Transformers%3A+Age+of+Extinction&gs_lp=Egxnd3Mtd2l6LXNlcnAiH1RyYW5zZm9ybWVyczogQWdlIG9mIEV4dGluY3Rpb24yBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIEEAAYHjIEEAAYHjIEEAAYHjIEEAAYHjIEEAAYHkiRB1DlBFjlBHADeACQAQCYAYIBoAGCAaoBAzAuMbgBA8gBAPgBAvgBAZgCBKACigHCAgYQABgHGB7CAgoQABiABBhDGIoFmAMAiAYBkgcDMy4xoAfOBg&sclient=gws-wiz-serp#vhid=AKFM_budo8VVBM&vssid=mosaic", // Image for the 2014 movie
      },
      {
        title: "Transformers: The Last Knight",
        year: 2017,
        src: "https://www.google.com/search?q=Transformers%3A+The+Last+Knight&sca_esv=a5db118e05c2ad26&udm=2&biw=1920&bih=945&sxsrf=ADLYWIJ6_ngMNsf5dxpuwe1aSu5WgVTvIA%3A1728227225689&ei=macCZ5DhKYLskdUPqsKCuAM&ved=0ahUKEwjQkYOPhPqIAxUCdqQEHSqhADcQ4dUDCBA&uact=5&oq=Transformers%3A+The+Last+Knight&gs_lp=Egxnd3Mtd2l6LXNlcnAiHVRyYW5zZm9ybWVyczogVGhlIExhc3QgS25pZ2h0MgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjyB1DlBFjlBHADeACQAQCYAXGgAXGqAQMwLjG4AQPIAQD4AQL4AQGYAgSgAnzCAgYQABgHGB7CAgoQABiABBhDGIoFwgIEEAAYHpgDAIgGAZIHAzMuMaAHswY&sclient=gws-wiz-serp#vhid=fpSeAs95qQyH4M&vssid=mosaic", // Image for the 2017 movie
      },
      {
        title: "Bumblebee",
        year: 2018,
        src: "https://www.google.com/search?q=Bumblebee&sca_esv=a5db118e05c2ad26&udm=2&biw=1920&bih=945&sxsrf=ADLYWIIG3BIlsOMNT_rAIN19rt8wVx2Q_Q%3A1728227251527&ei=s6cCZ8_xH-6ckdUPlMG7-QY&ved=0ahUKEwiPl6ybhPqIAxVuTqQEHZTgLm8Q4dUDCBA&uact=5&oq=Bumblebee&gs_lp=Egxnd3Mtd2l6LXNlcnAiCUJ1bWJsZWJlZTIFEAAYgAQyChAAGIAEGEMYigUyBRAAGIAEMgoQABiABBhDGIoFMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESIQHUOMDWOMDcAN4AJABAJgBfaABfaoBAzAuMbgBA8gBAPgBAvgBAZgCBKAChwHCAgYQABgHGB6YAwCIBgGSBwMzLjGgB9IE&sclient=gws-wiz-serp#vhid=avNbV8JLV_qlFM&vssid=mosaic", // Image for the 2018 movie
      },
    ],
  },
];

export default movies;
