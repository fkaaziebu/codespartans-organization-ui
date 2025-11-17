export const LogoIcon = ({
  height = 57,
  width = 57,
}: {
  height?: number;
  width?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_dddi_1271_19)">
        <g clipPath="url(#clip0_1271_19)">
          <path
            d="M4.5 22.2C4.5 15.4794 4.5 12.1191 5.80792 9.55211C6.9584 7.29417 8.79417 5.4584 11.0521 4.30792C13.6191 3 16.9794 3 23.7 3H33.3C40.0206 3 43.3809 3 45.9479 4.30792C48.2058 5.4584 50.0416 7.29417 51.1921 9.55211C52.5 12.1191 52.5 15.4794 52.5 22.2V31.8C52.5 38.5206 52.5 41.8809 51.1921 44.4479C50.0416 46.7058 48.2058 48.5416 45.9479 49.6921C43.3809 51 40.0206 51 33.3 51H23.7C16.9794 51 13.6191 51 11.0521 49.6921C8.79417 48.5416 6.9584 46.7058 5.80792 44.4479C4.5 41.8809 4.5 38.5206 4.5 31.8V22.2Z"
            fill="white"
          />
          <path
            d="M4.5 22.2C4.5 15.4794 4.5 12.1191 5.80792 9.55211C6.9584 7.29417 8.79417 5.4584 11.0521 4.30792C13.6191 3 16.9794 3 23.7 3H33.3C40.0206 3 43.3809 3 45.9479 4.30792C48.2058 5.4584 50.0416 7.29417 51.1921 9.55211C52.5 12.1191 52.5 15.4794 52.5 22.2V31.8C52.5 38.5206 52.5 41.8809 51.1921 44.4479C50.0416 46.7058 48.2058 48.5416 45.9479 49.6921C43.3809 51 40.0206 51 33.3 51H23.7C16.9794 51 13.6191 51 11.0521 49.6921C8.79417 48.5416 6.9584 46.7058 5.80792 44.4479C4.5 41.8809 4.5 38.5206 4.5 31.8V22.2Z"
            fill="url(#paint0_linear_1271_19)"
            fillOpacity="0.2"
          />
          <g opacity="0.14" clipPath="url(#clip1_1271_19)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28.4417 3H28.5582V5.94185C31.3394 5.94938 33.9937 6.49604 36.4223 7.48282V3H36.5388V7.53057C38.6008 8.38289 40.4979 9.55323 42.169 10.9805H44.4029V3H44.5194V10.9805H52.5V11.097H44.5194V13.3309C45.9467 15.002 47.117 16.899 47.9694 18.9609H52.5V19.0774H48.0171C49.0039 21.506 49.5506 24.1603 49.5582 26.9414H52.5V27.0579H49.5582C49.5507 29.839 49.0041 32.4933 48.0174 34.9219H52.5V35.0384H47.9697C47.1173 37.1006 45.9468 38.9979 44.5194 40.6691V42.9023H52.5V43.0188H44.5194V51H44.4029V43.0188H42.1698C40.4986 44.4464 38.6012 45.617 36.5388 46.4695V51H36.4223V46.5172C33.9937 47.504 31.3394 48.0507 28.5582 48.0582V51H28.4417V48.0582C25.6606 48.0507 23.0063 47.504 20.5777 46.5172V51H20.4612V46.4695C18.3988 45.617 16.5015 44.4464 14.8302 43.0188H12.5971V51H12.4806V43.0188H4.5V42.9023H12.4806V40.6691C11.0532 38.9979 9.88271 37.1006 9.03035 35.0384H4.5V34.9219H8.98261C7.9959 32.4933 7.44931 29.839 7.44183 27.0579H4.5V26.9414H7.44183C7.44941 24.1603 7.9961 21.506 8.9829 19.0774H4.5V18.9609H9.03065C9.88298 16.899 11.0533 15.002 12.4806 13.3309V11.097H4.5V10.9805H12.4806V3H12.5971V10.9805H14.831C16.5021 9.55323 18.3992 8.38289 20.4612 7.53057V3H20.5777V7.48282C23.0063 6.49604 25.6606 5.94938 28.4417 5.94185V3ZM28.4417 6.05836C25.6594 6.06594 23.0046 6.61612 20.5777 7.60867V10.9805H28.4417V6.05836ZM20.4612 7.65673C18.4706 8.48493 16.6353 9.61145 15.0111 10.9805H20.4612V7.65673ZM14.6958 11.097H12.5971V13.1957C13.2466 12.448 13.9481 11.7465 14.6958 11.097ZM12.5971 13.374C13.2968 12.5581 14.0582 11.7967 14.8741 11.097H20.4612V18.9609H12.5971V13.374ZM12.4806 13.511C11.1115 15.1352 9.98503 16.9704 9.15681 18.9609H12.4806V13.511ZM9.10875 19.0774C8.11618 21.5043 7.56596 24.1591 7.55833 26.9414H12.4806V19.0774H9.10875ZM7.55833 27.0579C7.56586 29.8402 8.11598 32.495 9.10845 34.9219H12.4806V27.0579H7.55833ZM9.15651 35.0384C9.98475 37.0292 11.1114 38.8647 12.4806 40.4891V35.0384H9.15651ZM12.5971 40.8044V42.9023H14.6949C13.9476 42.253 13.2464 41.5518 12.5971 40.8044ZM14.8732 42.9023C14.0577 42.2028 13.2965 41.4417 12.5971 40.6261V35.0384H20.4612V42.9023H14.8732ZM15.0102 43.0188C16.6346 44.3882 18.4702 45.515 20.4612 46.3433V43.0188H15.0102ZM20.5777 46.3914C23.0046 47.3839 25.6594 47.9341 28.4417 47.9417V43.0188H20.5777V46.3914ZM28.5582 47.9417C31.3406 47.9341 33.9954 47.3839 36.4223 46.3914V43.0188H28.5582V47.9417ZM36.5388 46.3433C38.5298 45.515 40.3654 44.3882 41.9898 43.0188H36.5388V46.3433ZM42.3051 42.9023H44.4029V40.8044C43.7536 41.5518 43.0524 42.253 42.3051 42.9023ZM44.4029 40.6261C43.7035 41.4417 42.9423 42.2028 42.1268 42.9023H36.5388V35.0384H44.4029V40.6261ZM44.5194 40.4891C45.8886 38.8647 47.0153 37.0292 47.8435 35.0384H44.5194V40.4891ZM47.8916 34.9219C48.884 32.495 49.4341 29.8402 49.4417 27.0579H44.5194V34.9219H47.8916ZM49.4417 26.9414C49.434 24.1591 48.8838 21.5043 47.8913 19.0774H44.5194V26.9414H49.4417ZM47.8432 18.9609C47.015 16.9704 45.8885 15.1352 44.5194 13.511V18.9609H47.8432ZM44.4029 13.1957V11.097H42.3042C43.0519 11.7465 43.7534 12.448 44.4029 13.1957ZM42.1259 11.097C42.9418 11.7967 43.7032 12.5581 44.4029 13.374V18.9609H36.5388V11.097H42.1259ZM41.9889 10.9805C40.3647 9.61145 38.5294 8.48493 36.5388 7.65673V10.9805H41.9889ZM36.4223 7.60867C33.9954 6.61611 31.3406 6.06593 28.5582 6.05836V10.9805H36.4223V7.60867ZM20.5777 11.097H28.4417V18.9609H20.5777V11.097ZM36.4223 11.097H28.5582V18.9609H36.4223V11.097ZM20.4612 34.9219H12.5971V27.0579H20.4612V34.9219ZM20.5777 35.0384V42.9023H28.4417V35.0384H20.5777ZM28.4417 34.9219H20.5777V27.0579H28.4417V34.9219ZM28.5582 35.0384V42.9023H36.4223V35.0384H28.5582ZM36.4223 34.9219H28.5582V27.0579H36.4223V34.9219ZM44.4029 34.9219H36.5388V27.0579H44.4029V34.9219ZM20.5777 19.0774H28.4417V26.9414H20.5777V19.0774ZM12.5971 19.0774L20.4612 19.0774V26.9414H12.5971V19.0774ZM36.4223 19.0774H28.5582V26.9414H36.4223V19.0774ZM36.5388 26.9414V19.0774H44.4029V26.9414H36.5388Z"
              fill="#0A0D12"
            />
          </g>
          <g filter="url(#filter1_dd_1271_19)">
            <rect
              x="16.5"
              y={15}
              width={24}
              height={24}
              rx={12}
              fill="url(#paint1_linear_1271_19)"
            />
            <rect
              x="16.5"
              y={15}
              width={24}
              height={24}
              rx={12}
              fill="url(#paint2_radial_1271_19)"
              fillOpacity="0.08"
            />
            <rect
              x="16.5"
              y={15}
              width={24}
              height={24}
              rx={12}
              fill="url(#paint3_radial_1271_19)"
              fillOpacity="0.18"
            />
            <rect
              x="16.5"
              y={15}
              width={24}
              height={24}
              rx={12}
              fill="url(#paint4_radial_1271_19)"
              fillOpacity="0.05"
            />
            <path
              d="M35.7003 21.0621C35.7003 23.0847 32.4767 21.7945 28.5003 21.7945C24.5238 21.7945 21.3003 23.0847 21.3003 21.0621C21.3003 19.0396 24.5238 17.4 28.5003 17.4C32.4767 17.4 35.7003 19.0396 35.7003 21.0621Z"
              fill="url(#paint5_linear_1271_19)"
              fillOpacity="0.4"
            />
          </g>
          <foreignObject x={-3} y="19.5" width={63} height={39}>
            <div
              style={{
                backdropFilter: "blur(3.75px)",
                clipPath: "url(#bgblur_2_1271_19_clip_path)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          <g data-figma-bg-blur-radius="7.5">
            <path
              d="M4.5 27H52.5V31.8C52.5 38.5206 52.5 41.8809 51.1921 44.4479C50.0416 46.7058 48.2058 48.5416 45.9479 49.6921C43.3809 51 40.0206 51 33.3 51H23.7C16.9794 51 13.6191 51 11.0521 49.6921C8.79417 48.5416 6.9584 46.7058 5.80792 44.4479C4.5 41.8809 4.5 38.5206 4.5 31.8V27Z"
              fill="white"
              fillOpacity="0.2"
            />
          </g>
        </g>
        <path
          d="M23.7002 3.15039H33.2998C36.6624 3.15039 39.1755 3.15063 41.1689 3.31348C43.1607 3.47621 44.6211 3.80002 45.8799 4.44141C48.1096 5.5775 49.9225 7.3904 51.0586 9.62012C51.7 10.8789 52.0238 12.3393 52.1865 14.3311C52.3494 16.3245 52.3496 18.8376 52.3496 22.2002V31.7998C52.3496 35.1624 52.3494 37.6755 52.1865 39.6689C52.0238 41.6607 51.7 43.1211 51.0586 44.3799C49.9225 46.6096 48.1096 48.4225 45.8799 49.5586C44.6211 50.2 43.1607 50.5238 41.1689 50.6865C39.1755 50.8494 36.6624 50.8496 33.2998 50.8496H23.7002C20.3376 50.8496 17.8245 50.8494 15.8311 50.6865C13.8393 50.5238 12.3789 50.2 11.1201 49.5586C8.8904 48.4225 7.0775 46.6096 5.94141 44.3799C5.30002 43.1211 4.97621 41.6607 4.81348 39.6689C4.65063 37.6755 4.65039 35.1624 4.65039 31.7998V22.2002C4.65039 18.8376 4.65063 16.3245 4.81348 14.3311C4.97621 12.3393 5.30002 10.8789 5.94141 9.62012C7.0775 7.3904 8.8904 5.5775 11.1201 4.44141C12.3789 3.80002 13.8393 3.47621 15.8311 3.31348C17.8245 3.15063 20.3376 3.15039 23.7002 3.15039Z"
          stroke="#0A0D12"
          strokeOpacity="0.12"
          strokeWidth="0.3"
        />
      </g>
      <defs>
        <filter
          id="filter0_dddi_1271_19"
          x={0}
          y={0}
          width={57}
          height={57}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.5" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1271_19"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.5" />
          <feGaussianBlur stdDeviation="2.25" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1271_19"
            result="effect2_dropShadow_1271_19"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="0.75"
            operator="erode"
            in="SourceAlpha"
            result="effect3_dropShadow_1271_19"
          />
          <feOffset dy="1.5" />
          <feGaussianBlur stdDeviation="0.75" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.13 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_1271_19"
            result="effect3_dropShadow_1271_19"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_1271_19"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-0.75" />
          <feGaussianBlur stdDeviation="0.375" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect4_innerShadow_1271_19"
          />
        </filter>
        <filter
          id="filter1_dd_1271_19"
          x={12}
          y={12}
          width={33}
          height={33}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.5" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1271_19"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1.5" />
          <feGaussianBlur stdDeviation="2.25" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0705882 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1271_19"
            result="effect2_dropShadow_1271_19"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_1271_19"
            result="shape"
          />
        </filter>
        <clipPath
          id="bgblur_2_1271_19_clip_path"
          transform="translate(3 -19.5)"
        >
          <path d="M4.5 27H52.5V31.8C52.5 38.5206 52.5 41.8809 51.1921 44.4479C50.0416 46.7058 48.2058 48.5416 45.9479 49.6921C43.3809 51 40.0206 51 33.3 51H23.7C16.9794 51 13.6191 51 11.0521 49.6921C8.79417 48.5416 6.9584 46.7058 5.80792 44.4479C4.5 41.8809 4.5 38.5206 4.5 31.8V27Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_1271_19"
          x1="28.5"
          y1={3}
          x2="28.5"
          y2={51}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="#0A0D12" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1271_19"
          x1="22.5"
          y1={39}
          x2="34.5"
          y2={15}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#53389E" />
          <stop offset={1} stopColor="#6941C6" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_1271_19"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5 15) rotate(90) scale(18)"
        >
          <stop stopColor="white" stopOpacity={0} />
          <stop offset="0.5" stopColor="white" stopOpacity={0} />
          <stop offset="0.99" stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="paint3_radial_1271_19"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5 27) rotate(90) scale(12)"
        >
          <stop offset="0.746599" stopColor="white" stopOpacity={0} />
          <stop offset={1} stopColor="white" />
        </radialGradient>
        <radialGradient
          id="paint4_radial_1271_19"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(28.5 21.9) rotate(90) scale(10.5)"
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </radialGradient>
        <linearGradient
          id="paint5_linear_1271_19"
          x1="28.5003"
          y1="17.4"
          x2="28.5003"
          y2="22.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity="0.1" />
        </linearGradient>
        <clipPath id="clip0_1271_19">
          <path
            d="M4.5 22.2C4.5 15.4794 4.5 12.1191 5.80792 9.55211C6.9584 7.29417 8.79417 5.4584 11.0521 4.30792C13.6191 3 16.9794 3 23.7 3H33.3C40.0206 3 43.3809 3 45.9479 4.30792C48.2058 5.4584 50.0416 7.29417 51.1921 9.55211C52.5 12.1191 52.5 15.4794 52.5 22.2V31.8C52.5 38.5206 52.5 41.8809 51.1921 44.4479C50.0416 46.7058 48.2058 48.5416 45.9479 49.6921C43.3809 51 40.0206 51 33.3 51H23.7C16.9794 51 13.6191 51 11.0521 49.6921C8.79417 48.5416 6.9584 46.7058 5.80792 44.4479C4.5 41.8809 4.5 38.5206 4.5 31.8V22.2Z"
            fill="white"
          />
        </clipPath>
        <clipPath id="clip1_1271_19">
          <rect
            width={48}
            height={48}
            fill="white"
            transform="translate(4.5 3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
