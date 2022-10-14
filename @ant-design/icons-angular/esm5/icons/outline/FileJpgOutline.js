export var FileJpgOutline = {
    name: 'file-jpg',
    theme: 'outline',
    icon: '<svg viewBox="0 0 1024 1024" focusable="false"><path d="M874.6 301.8L596.8 21.3c-4.5-4.5-9.4-8.3-14.7-11.5-1.4-.8-2.8-1.6-4.3-2.3-.9-.5-1.9-.9-2.8-1.3-9-4-18.9-6.2-29-6.2H201c-39.8 0-73 32.2-73 72v880c0 39.8 33.2 72 73 72h623c39.8 0 71-32.2 71-72V352.5c0-19-7-37.2-20.4-50.7zM583 110.4L783.8 312H583V110.4zM823 952H200V72h311v240c0 39.8 33.2 72 73 72h239v568zM350 696.5c0 24.2-7.5 31.4-21.9 31.4-9 0-18.4-5.8-24.8-18.5L272.9 732c13.4 22.9 32.3 34.2 61.3 34.2 41.6 0 60.8-29.9 60.8-66.2V577h-45v119.5zM501.3 577H437v186h44v-62h21.6c39.1 0 73.1-19.6 73.1-63.6 0-45.8-33.5-60.4-74.4-60.4zm-.8 89H481v-53h18.2c21.5 0 33.4 6.2 33.4 24.9 0 18.1-10.5 28.1-32.1 28.1zm182.5-9v36h30v30.1c-4 2.9-11 4.7-17.7 4.7-34.3 0-50.7-21.4-50.7-58.2 0-36.1 19.7-57.4 47.1-57.4 15.3 0 25 6.2 34 14.4l23.7-28.3c-12.7-12.8-32.1-24.2-59.2-24.2-49.6 0-91.1 35.3-91.1 97 0 62.7 40 95.1 91.5 95.1 25.9 0 49.2-10.2 61.5-22.6V657H683z" /></svg>'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUpwZ091dGxpbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW50LWRlc2lnbi9pY29ucy1hbmd1bGFyL2ljb25zLyIsInNvdXJjZXMiOlsib3V0bGluZS9GaWxlSnBnT3V0bGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQW1CO0lBQzFDLElBQUksRUFBRSxVQUFVO0lBQ2hCLEtBQUssRUFBRSxTQUFTO0lBQ2hCLElBQUksRUFBRSxvNUJBQW81QjtDQUM3NUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhcic7XG5cbmV4cG9ydCBjb25zdCBGaWxlSnBnT3V0bGluZTogSWNvbkRlZmluaXRpb24gPSB7XG4gICAgbmFtZTogJ2ZpbGUtanBnJyxcbiAgICB0aGVtZTogJ291dGxpbmUnLFxuICAgIGljb246ICc8c3ZnIHZpZXdCb3g9XCIwIDAgMTAyNCAxMDI0XCIgZm9jdXNhYmxlPVwiZmFsc2VcIj48cGF0aCBkPVwiTTg3NC42IDMwMS44TDU5Ni44IDIxLjNjLTQuNS00LjUtOS40LTguMy0xNC43LTExLjUtMS40LS44LTIuOC0xLjYtNC4zLTIuMy0uOS0uNS0xLjktLjktMi44LTEuMy05LTQtMTguOS02LjItMjktNi4ySDIwMWMtMzkuOCAwLTczIDMyLjItNzMgNzJ2ODgwYzAgMzkuOCAzMy4yIDcyIDczIDcyaDYyM2MzOS44IDAgNzEtMzIuMiA3MS03MlYzNTIuNWMwLTE5LTctMzcuMi0yMC40LTUwLjd6TTU4MyAxMTAuNEw3ODMuOCAzMTJINTgzVjExMC40ek04MjMgOTUySDIwMFY3MmgzMTF2MjQwYzAgMzkuOCAzMy4yIDcyIDczIDcyaDIzOXY1Njh6TTM1MCA2OTYuNWMwIDI0LjItNy41IDMxLjQtMjEuOSAzMS40LTkgMC0xOC40LTUuOC0yNC44LTE4LjVMMjcyLjkgNzMyYzEzLjQgMjIuOSAzMi4zIDM0LjIgNjEuMyAzNC4yIDQxLjYgMCA2MC44LTI5LjkgNjAuOC02Ni4yVjU3N2gtNDV2MTE5LjV6TTUwMS4zIDU3N0g0Mzd2MTg2aDQ0di02MmgyMS42YzM5LjEgMCA3My4xLTE5LjYgNzMuMS02My42IDAtNDUuOC0zMy41LTYwLjQtNzQuNC02MC40em0tLjggODlINDgxdi01M2gxOC4yYzIxLjUgMCAzMy40IDYuMiAzMy40IDI0LjkgMCAxOC4xLTEwLjUgMjguMS0zMi4xIDI4LjF6bTE4Mi41LTl2MzZoMzB2MzAuMWMtNCAyLjktMTEgNC43LTE3LjcgNC43LTM0LjMgMC01MC43LTIxLjQtNTAuNy01OC4yIDAtMzYuMSAxOS43LTU3LjQgNDcuMS01Ny40IDE1LjMgMCAyNSA2LjIgMzQgMTQuNGwyMy43LTI4LjNjLTEyLjctMTIuOC0zMi4xLTI0LjItNTkuMi0yNC4yLTQ5LjYgMC05MS4xIDM1LjMtOTEuMSA5NyAwIDYyLjcgNDAgOTUuMSA5MS41IDk1LjEgMjUuOSAwIDQ5LjItMTAuMiA2MS41LTIyLjZWNjU3SDY4M3pcIiAvPjwvc3ZnPidcbn0iXX0=