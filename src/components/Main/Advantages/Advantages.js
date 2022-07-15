import "./Advantages.css";

function Advantages() {
  const advantages = [
    {
      icon: (
        <svg
          width="57"
          height="75"
          viewBox="0 0 57 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="55.1904" width="13.5714" height="15.381" rx="3.11825" fill="#A2A3FD" />
          <rect x="37.5938" y="24.428" width="16.2857" height="8.14286" rx="3.11825" fill="#A2A3FD" />
          <rect x="20.4062" y="46.1427" width="13.5714" height="24.4286" rx="3.11825" fill="#A2A3FD" /> 
          <rect x="40.3086" y="38.9045" width="13.5714" height="31.6667" rx="3.11825" fill="#A2A3FD" />
          <path d="M3.21484 5.42865H44.4161C45.6462 5.42865 46.6434 6.42585 46.6434 7.65597V19.9048" stroke="#A2A3FD" strokeWidth="2.67278" />
          <path d="M39.4062 24.6534C41.8634 20.3868 48.0996 14.4134 53.3868 24.6534C58.674 34.8934 47.2862 33.3993 47.2862 33.3993" stroke="#A2A3FD" strokeWidth="2.67278" />
        </svg>
      ),
      title: "Portfolio builder",
      text: "AI driven analytics that bulds indeces according to your preferencies",
    },
    {
      icon: (
        <svg
          width="54"
          height="55"
          viewBox="0 0 54 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32.9835 1.96317C36.0304 -1.2006 41.3442 1.39655 40.7198 5.74434L39.2114 16.2475C38.9317 18.1946 39.9424 20.0993 41.7117 20.9592L51.255 25.5978C55.2055 27.5179 54.3775 33.3742 50.0495 34.1239L39.5943 35.9349C37.6561 36.2707 36.1569 37.8205 35.8858 39.7688L34.4233 50.2785C33.8179 54.629 27.9924 55.6512 25.942 51.7667L20.9888 42.3829C20.0705 40.6433 18.1333 39.6964 16.1965 40.0406L5.74933 41.8974C1.4247 42.666 -1.34767 37.4415 1.71306 34.2911L9.10696 26.6805C10.4777 25.2696 10.7796 23.1346 9.85368 21.399L4.85944 12.0369C2.79207 8.16145 6.90415 3.91031 10.8462 5.8477L20.3691 10.5279C22.1346 11.3956 24.2584 11.0229 25.6229 9.60602L32.9835 1.96317Z" fill="#A2A3FD" />
        </svg>
      ),
      title: "Build for newbies",
      text: "Take controld by yourself or use  our guides to learn and outperforme",
    },
    {
      icon: (
        <svg
          width="57"
          height="74"
          viewBox="0 0 57 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M36.5902 65.765C39.8027 64.3557 46.341 61.8763 46.794 63.2332C47.3602 64.9292 39.6285 68.3041 35.1284 67.5209M37.192 63.7158C35.2047 64.04 32.1302 64.8451 35.7302 65.4717C40.2304 66.255 47.962 62.88 47.3958 61.184C46.9428 59.8271 40.4045 62.3065 37.192 63.7158Z" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M37.1058 68.7604C40.3183 67.3512 46.8567 64.8718 47.3096 66.2286C47.8758 67.9247 40.1442 71.2996 35.6441 70.5163M37.7076 66.7113C35.7203 67.0355 32.6458 67.8405 36.2459 68.4672C40.746 69.2504 48.4776 65.8755 47.9114 64.1795C47.4585 62.8226 40.9201 65.302 37.7076 66.7113Z" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M23.4547 13.8238L19.4934 3.10424" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M35.469 12.3367L37.4616 0.999999" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M47.9127 18.8098L54.5661 9.76965" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M12.344 23.2403L2.73823 18.1432" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M11.705 40.405L0.998115 40.4641" stroke="#A2A3FD" strokeWidth="2.71429" />
          <path d="M19.1558 45.6666C23.6963 50.3469 26.8122 53.9424 28.8484 56.5103C30.9615 59.175 34.1717 61.223 37.5206 60.6309C39.9235 60.206 42.5491 59.3665 44.139 57.7177C48.6568 53.0327 44.5197 52.2306 46.0425 40.5385C47.946 25.9234 43.8655 20.765 34.8595 19.0004C19.1558 15.9236 8.21073 34.3848 19.1558 45.6666Z" fill="#A2A3FD" />
        </svg>
      ),
      title: "Easy to understand",
      text: "Use our daily analytics to learn about latest news and adjust your strategy",
    },
  ];

  return (
    <section className="advantages">
      <p className="advantages__title">
        Why is it convenient and safe with us?
      </p>
      <ul className="advantages__list">
        {advantages.map((item, i) => (
          <li className="advantages__item" key={i}>
            <div className="advantages__icon-box">
              {item.icon}
            </div>
            <p className="advantages__item-title">{item.title}</p>
            <p className="advantages__item-text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Advantages;
