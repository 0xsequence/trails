import DiscordColorIconBlack from "@/assets/DiscordColorIcon-black.svg"
import DiscordColorIconWhite from "@/assets/DiscordColorIcon-white.svg"
import GithubIconBlack from "@/assets/GithubIcon-black.svg"
import GithubIconWhite from "@/assets/GithubIcon-white.svg"
import SequenceLogoBlack from "@/assets/sequence-logo-black.svg"
import SequenceLogoWhite from "@/assets/sequence-logo-white.svg"
import TwitterIconBlack from "@/assets/TwitterIcon-black.svg"
import TwitterIconWhite from "@/assets/TwitterIcon-white.svg"
import {
  DISCORD_URL,
  GITHUB_URL,
  LANDING_PAGE_URL,
  SEQUENCE_URL,
  TWITTER_URL,
} from "@/config"
import { useTheme } from "@/contexts/ThemeContext"
import { ThemeToggle } from "./ThemeToggle"

export const SiteFooter = () => {
  const { theme } = useTheme()

  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Left side - Trails Logo */}
        <div className="flex items-center flex-1">
          <a
            href={LANDING_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <svg
              width="88"
              height="34"
              viewBox="0 0 88 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Trails Logo"
              className="text-gray-900 dark:text-white"
            >
              <title>Trails Logo</title>
              <path
                d="M38.6446 28.5C37.5577 28.5 36.5651 28.3035 35.6667 27.9104C34.7794 27.5066 34.0752 26.9223 33.5539 26.1574C33.0326 25.3924 32.772 24.4575 32.772 23.3526C32.772 21.5571 33.4929 20.176 34.9347 19.2092C36.3765 18.2424 38.6391 17.7536 41.7224 17.743L43.4692 17.7271V16.8825C43.4692 16.2344 43.2751 15.751 42.8869 15.4323C42.5098 15.1029 41.9164 14.9436 41.1068 14.9542C40.5301 14.9648 39.9478 15.0976 39.36 15.3526C38.7722 15.5969 38.3563 16.0538 38.1123 16.7231H33.4707C33.5372 15.4801 33.9199 14.4655 34.6186 13.6793C35.3173 12.8931 36.249 12.3141 37.4135 11.9422C38.5892 11.5704 39.9034 11.3845 41.3564 11.3845C43.2418 11.3845 44.7335 11.6023 45.8315 12.0378C46.9296 12.4628 47.7115 13.0631 48.1773 13.8386C48.6542 14.6036 48.8926 15.5066 48.8926 16.5478V28.1813H44.1845L43.7021 25.4562C43.1586 26.6142 42.4765 27.411 41.6558 27.8466C40.8351 28.2822 39.8314 28.5 38.6446 28.5ZM40.5911 25.01C40.9682 25.01 41.3286 24.9462 41.6724 24.8187C42.0163 24.6912 42.3213 24.5159 42.5874 24.2928C42.8536 24.0591 43.0644 23.8041 43.2196 23.5279C43.3749 23.2517 43.4581 22.9542 43.4692 22.6355V20.3884L42.0717 20.4044C41.495 20.4044 40.8961 20.4788 40.275 20.6275C39.665 20.7762 39.1493 21.0259 38.7278 21.3765C38.3064 21.7165 38.0956 22.1892 38.0956 22.7948C38.0956 23.4854 38.3452 24.0272 38.8443 24.4203C39.3434 24.8134 39.9256 25.01 40.5911 25.01Z"
                fill="currentColor"
              />
              <path
                d="M19.5117 28.1813V11.7032H24.9685V15.9263C25.2346 15.0657 25.6173 14.2955 26.1164 13.6155C26.6266 12.925 27.2532 12.3831 27.9963 11.99C28.7394 11.5863 29.5989 11.3845 30.5749 11.3845C30.6969 11.3845 30.8023 11.3898 30.891 11.4004C30.9908 11.4004 31.0518 11.411 31.074 11.4323V16.5797C31.0186 16.5584 30.9465 16.5425 30.8577 16.5319C30.7801 16.5212 30.6969 16.5159 30.6082 16.5159C29.5213 16.4097 28.6229 16.4256 27.9131 16.5637C27.2144 16.7019 26.6598 16.925 26.2495 17.2331C25.8502 17.5412 25.5674 17.9077 25.401 18.3327C25.2457 18.7576 25.1681 19.2198 25.1681 19.7191V28.1813H19.5117Z"
                fill="currentColor"
              />
              <path
                d="M11.3461 28.3884C9.69352 28.3884 8.41251 28.1919 7.50306 27.7988C6.60469 27.3951 5.97805 26.8479 5.62314 26.1574C5.27933 25.4562 5.10742 24.6647 5.10742 23.7829V15.4163H2.3125V11.7032H5.30705L6.75442 6.6514H10.7638V11.6713H14.5403V15.4163H10.7638L10.7804 23.5438C10.7804 23.8732 10.8303 24.1175 10.9302 24.2769C11.0411 24.4363 11.1908 24.5425 11.3793 24.5956C11.5679 24.6487 11.7952 24.6753 12.0614 24.6753H14.5735V27.9422C14.3406 28.0379 13.9802 28.1335 13.4922 28.2291C13.0042 28.3353 12.2888 28.3884 11.3461 28.3884Z"
                fill="currentColor"
              />
              <path
                d="M66.5682 28.5C65.1375 28.5 64.0118 28.3459 63.1911 28.0378C62.3814 27.7297 61.788 27.3313 61.411 26.8426C61.0339 26.3433 60.7954 25.7908 60.6956 25.1853C60.6069 24.5797 60.5625 23.9794 60.5625 23.3845V4.5H66.1024V22.6833C66.1024 23.1826 66.1794 23.7863 66.4234 24.1582C66.6674 24.5194 67.1942 24.7478 68.0038 24.8434L68.7525 24.8912L68.7975 28.0538C68.4426 28.1706 68.0766 28.2716 67.6995 28.3566C67.3224 28.4522 66.9453 28.5 66.5682 28.5Z"
                fill="currentColor"
              />
              <path
                d="M51.9839 28.1813V11.7032H57.3741V28.1813H51.9839ZM51.9673 9.85458V5.13745H57.4074V9.85458H51.9673Z"
                fill="currentColor"
              />
              <rect
                x="66.1875"
                y="24.875"
                width="9.54688"
                height="3.625"
                fill="currentColor"
              />
              <path
                d="M76.3006 11.3848C78.5409 11.3848 80.3216 11.8522 81.6414 12.7871C82.961 13.722 83.6264 15.0127 83.6375 16.6592H78.9793C78.8573 16.0963 78.5411 15.6716 78.0311 15.3848C77.532 15.0873 76.9329 14.9385 76.2342 14.9385C75.5244 14.9385 74.9253 15.0554 74.4373 15.2891C73.9607 15.5121 73.7225 15.8519 73.7225 16.3086C73.7225 16.6592 73.9329 16.9408 74.3543 17.1533C74.7757 17.3658 75.4466 17.5576 76.367 17.7275L78.8797 18.2207C79.911 18.465 80.7482 18.7947 81.3914 19.209C82.0347 19.6127 82.5281 20.0542 82.8719 20.5322C83.2267 21.0102 83.4657 21.4879 83.5877 21.9658C83.7208 22.4332 83.7869 22.8478 83.7869 23.209C83.7869 24.3458 83.4598 25.3076 82.8055 26.0938C82.1622 26.8798 81.269 27.4802 80.1268 27.8945C78.9956 28.2981 77.709 28.5 76.2674 28.5C75.0698 28.5 73.8998 28.3091 72.7576 27.9268C71.6153 27.5443 70.6386 26.933 69.8289 26.0938C69.4823 25.7344 69.1889 25.3279 68.9481 24.875H76.2244C76.227 24.875 76.2297 24.875 76.2322 24.875C77.0527 24.875 77.7202 24.7552 78.2303 24.5322C78.7404 24.3091 78.9959 23.9685 78.9959 23.5117C78.9959 23.1294 78.835 22.8316 78.5135 22.6191C78.2029 22.3961 77.6533 22.2212 76.866 22.0938L74.0877 21.5996C72.5019 21.3127 71.2264 20.7863 70.2615 20.0215C69.2969 19.246 68.8088 18.152 68.7977 16.7393C68.7866 15.73 69.0696 14.8211 69.6463 14.0137C70.223 13.2064 71.0713 12.569 72.1912 12.1016C73.3114 11.6235 74.6815 11.3848 76.3006 11.3848Z"
                fill="currentColor"
              />
              <rect
                x="12.3125"
                y="11.6797"
                width="10.1875"
                height="3.74219"
                fill="currentColor"
              />
              <rect
                x="1.31738"
                y="11.6797"
                width="10.1875"
                height="3.74219"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>

        {/* Center - Social Media Icons */}
        <div className="flex items-center space-x-6">
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <img
              src={theme === "dark" ? TwitterIconWhite : TwitterIconBlack}
              alt="Twitter"
              className="w-6 h-6"
            />
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <img
              src={
                theme === "dark" ? DiscordColorIconWhite : DiscordColorIconBlack
              }
              alt="Discord"
              className="w-6 h-6"
            />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <img
              src={theme === "dark" ? GithubIconWhite : GithubIconBlack}
              alt="GitHub"
              className="w-6 h-6"
            />
          </a>
        </div>

        {/* Right side - Theme Toggle and Powered by Sequence */}
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs space-x-3 flex-1 justify-end">
          <ThemeToggle />
          <span>Powered by</span>
          <a
            href={SEQUENCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={theme === "dark" ? SequenceLogoWhite : SequenceLogoBlack}
              alt="Sequence"
              className="w-16 h-3"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
