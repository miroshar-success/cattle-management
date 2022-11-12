import React from "react";

export const Pagination = ({
  animals,
  showPerPage,
  page,
  pagination,
}) => {
  const pageNumbers = [];

  const total = animals && Math.ceil(animals / showPerPage);
  for (let i = 1; i <= Math.ceil(total); i++) {
    pageNumbers.push(i);
  }

  return (
    <div key={Math.random()} className="flex flex-col items-center w-full">
      <div className="flex">
        <button
          className="bg-transparent border border-1  rounded text-black font-bold py-1 px-2"
          onClick={page > 1 ? () => pagination(page - 1) : null}
          hidden={page === 1 ? true : false}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20.74C10.9012 20.7423 10.803 20.7238 10.7118 20.686C10.6205 20.6481 10.5382 20.5916 10.47 20.52L2.47 12.52C2.32955 12.3794 2.25066 12.1888 2.25066 11.99C2.25066 11.7913 2.32955 11.6007 2.47 11.46L10.47 3.46003C10.576 3.35806 10.7096 3.2895 10.8542 3.26288C10.9989 3.23626 11.1481 3.25274 11.2835 3.31029C11.4188 3.36783 11.5342 3.4639 11.6154 3.58653C11.6966 3.70917 11.7399 3.85296 11.74 4.00003V7.30003H21C21.1981 7.30262 21.3874 7.38247 21.5275 7.52256C21.6676 7.66265 21.7474 7.85192 21.75 8.05003V16.05C21.7474 16.2481 21.6676 16.4374 21.5275 16.5775C21.3874 16.7176 21.1981 16.7974 21 16.8H11.74V19.99C11.7402 20.139 11.6954 20.2845 11.6116 20.4076C11.5277 20.5307 11.4087 20.6257 11.27 20.68C11.1848 20.7175 11.0931 20.7379 11 20.74ZM4.07 12L10.25 18.18V16.05C10.25 15.8511 10.329 15.6603 10.4697 15.5197C10.6103 15.379 10.8011 15.3 11 15.3H20.25V8.80003H11C10.8019 8.79744 10.6126 8.71759 10.4725 8.57749C10.3324 8.4374 10.2526 8.24813 10.25 8.05003V5.82003L4.07 12Z"
              fill="black"
            />
          </svg>
        </button>
        {pageNumbers ? (
          <div className="page-number-buttons">
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={
                  page !== n
                    ? "bg-transparent border border-1 border-green rounded text-black font-bold py-1 px-2"
                    : "bg-green border border-1 border-green rounded text-gray-50 text-black font-bold py-1 px-2"
                }
                hidden={n >= page + 2 || n <= page - 2 ? true : false}
                onClick={() => pagination(n)}
              >
                {n}
              </button>
            ))}
          </div>
        ) : null}
        <button
          className="bg-transparent border border-1  rounded text-black font-bold py-1 px-2"
          onClick={page < total ? () => pagination(page + 1) : null}
          hidden={page === total ? true : false}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 20.74C12.9039 20.7541 12.8062 20.7541 12.71 20.74C12.5724 20.6823 12.4551 20.5849 12.3732 20.4602C12.2912 20.3355 12.2484 20.1892 12.25 20.04V16.7H3.00001C2.81189 16.6956 2.63208 16.6216 2.49538 16.4923C2.35868 16.363 2.27481 16.1876 2.26001 16V8.00002C2.25463 7.89856 2.26965 7.79706 2.30417 7.7015C2.3387 7.60595 2.39204 7.51829 2.46103 7.44371C2.53002 7.36913 2.61326 7.30913 2.70584 7.26727C2.79841 7.22542 2.89844 7.20255 3.00001 7.20002H12.25V4.01002C12.2498 3.86106 12.2946 3.71551 12.3784 3.59241C12.4623 3.4693 12.5813 3.37436 12.72 3.32002C12.8551 3.26039 13.0053 3.24376 13.1502 3.27238C13.2951 3.301 13.4277 3.37349 13.53 3.48002L21.53 11.48C21.6705 11.6206 21.7493 11.8113 21.7493 12.01C21.7493 12.2088 21.6705 12.3994 21.53 12.54L13.53 20.54C13.4601 20.6079 13.377 20.6608 13.2858 20.6952C13.1946 20.7296 13.0973 20.7448 13 20.74ZM3.76001 15.2H13C13.1981 15.2026 13.3874 15.2825 13.5275 15.4226C13.6676 15.5626 13.7474 15.7519 13.75 15.95V18.18L19.93 12L13.75 5.83002V8.00002C13.7477 8.19843 13.6689 8.3883 13.53 8.53002C13.3817 8.65257 13.1919 8.71343 13 8.70002H3.76001V15.2Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
