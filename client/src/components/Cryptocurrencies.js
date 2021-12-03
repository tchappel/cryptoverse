import { useEffect, useState } from "react";
import { Row, Col, Card, Input } from "antd";
import { Link } from "react-router-dom";
import millify from "millify";
import { useGetCryptosQuery } from "@services";

const Cryptocurrencies = ({ simplified }) => {
  const { data } = useGetCryptosQuery();
  const [filteredCoins, setFilteredCoins] = useState(data?.data?.coins || []);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data?.data?.coins) {
      let nextFilteredCoins;
      if (simplified) {
        // sort coins by marketCap
        nextFilteredCoins = data.data.coins
          .slice()
          .sort((a, b) => {
            return b.marketCap - a.marketCap;
          })
          .slice(0, 10);
      } else {
        nextFilteredCoins = search
          ? data.data.coins.filter((coin) =>
              coin.name.toLowerCase().includes(search.toLowerCase())
            )
          : data.data.coins;
      }
      setFilteredCoins(nextFilteredCoins);
    }
  }, [data, search, simplified]);

  if (!data) return "Loading";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {filteredCoins.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card
                title={`${coin.rank} ${coin.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={coin.iconUrl}
                    alt={`${coin.name} icon`}
                    style={{ height: "35px", width: "auto" }}
                  />
                }
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market cap: {millify(coin.marketCap)}</p>
                <p>Daily change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
