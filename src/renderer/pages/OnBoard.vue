<template>
  <div>
    <div id="onboarding-artwork" />
    <div id="onboarding-overlay" />
    <div id="action-menu">
      <div
        class="hero-y"
        style="width: 100%;">
        <div
          style="width: auto; max-width: 400px; display: block; margin: auto;">
          <img src="@/assets/logo.png" style="height: 40px; width: auto;">
          <h2
            style="margin-left: 12px; color: #0A4493; font-family: Roboto-Bold">
            InterBank Settlement Secure Transactions Platform
          </h2>
          <v-btn
            depressed
            color="#0A4493"
            class="white--text"
            style="margin-left: 12px;"
            @click="$router.replace('/login')">
            Go to your Account
          </v-btn>
        </div>
      </div>
    </div>
    <div id="financial-widget-wrapper">
      <div
        class="collapsible-widget-wrapper"
        style="padding: 10px 10px">
        <v-layout
          row
          wrap>
          <v-flex
            sm6
            md6
            lg6
            xl6>
            <Widget
              style="margin: 0 10px;">
              <WidgetHeading
                :id="7865"
                title="Stock Market"
                :Collapse="true"></WidgetHeading>
              <WidgetBody>
                <div
                  id="stock-market-widget"
                  class="tradingview-widget-container">
                  <div
                    class="tradingview-widget-container__widget" />
                  <div
                    class="tradingview-widget-copyright">
                    <a href="https://in.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Market Data</span></a>
                    by TradingView
                  </div>
                </div>
              </WidgetBody>
            </Widget>
          </v-flex>
          <v-flex
            sm6
            md6
            lg6
            xl6>
            <Widget
              style="margin: 0 10px;">
              <WidgetHeading
                :id="7866"
                title="Market Overview"
                :Collapse="true"></WidgetHeading>
              <WidgetBody>
                <div
                  id="market-overview-widget"
                  class="tradingview-widget-container">
                  <div
                    class="tradingview-widget-container__widget" />
                  <div
                    class="tradingview-widget-copyright">
                    <a href="https://in.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Market Data</span></a>
                    by TradingView
                  </div>
                </div>
              </WidgetBody>
            </Widget>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
          style="margin: 20px 0;">
          <v-flex
            lg12>
            <Widget
              style="margin: 0 10px;">
              <WidgetHeading
                :id="7869"
                title="Market Data Widget"
                :Collapse="true">
              </WidgetHeading>
              <WidgetBody>
                <div
                  id="stock-market-data-widget"
                  class="tradingview-widget-container">
                  <div
                    class="tradingview-widget-container__widget" />
                  <div
                    class="tradingview-widget-copyright">
                    <a href="https://in.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Market Data</span></a>
                    by TradingView
                  </div>
                </div>
              </WidgetBody>
            </Widget>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div
      class="ticker-tape-wrapper">
      <div
        id="ticker-tape-widget"
        class="tradingview-widget-container">
        <div
          class="tradingview-widget-container__widget" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      widgetHtml: `<script>console.log('hello) />`
    }
  },
  mounted () {
    this.$nextTick(() => {
      let stockMarketScript = document.createElement('script')
      stockMarketScript.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js')
      stockMarketScript.setAttribute('async', '')
      stockMarketScript.text = `{
        "exchange": "BSE",
        "showChart": true,
        "locale": "in",
        "largeChartUrl": "",
        "width": "100%",
        "height": "200",
        "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
        "plotLineColorFalling": "rgba(33, 150, 243, 1)",
        "gridLineColor": "rgba(242, 243, 245, 1)",
        "scaleFontColor": "rgba(131, 136, 141, 1)",
        "belowLineFillColorGrowing": "rgba(5, 122, 205, 0.12)",
        "belowLineFillColorFalling": "rgba(5, 122, 205, 0.12)",
        "symbolActiveColor": "rgba(225, 239, 249, 1)"
      }`
      document.getElementById('stock-market-widget').appendChild(stockMarketScript)

      let marketOverviewScript = document.createElement('script')
      marketOverviewScript.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js')
      marketOverviewScript.setAttribute('async', '')
      marketOverviewScript.text = ` {
        "showChart": true,
        "locale": "in",
        "largeChartUrl": "",
        "width": "100%",
        "height": "200",
        "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
        "plotLineColorFalling": "rgba(33, 150, 243, 1)",
        "gridLineColor": "rgba(233, 233, 234, 1)",
        "scaleFontColor": "rgba(131, 136, 141, 1)",
        "belowLineFillColorGrowing": "rgba(5, 122, 205, 0.12)",
        "belowLineFillColorFalling": "rgba(5, 122, 205, 0.12)",
        "symbolActiveColor": "rgba(225, 239, 249, 1)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              {
                "s": "INDEX:SPX",
                "d": "S&P 500"
              },
              {
                "s": "INDEX:XLY0",
                "d": "Shanghai Composite"
              },
              {
                "s": "INDEX:DOWI",
                "d": "Dow 30"
              },
              {
                "s": "INDEX:NKY",
                "d": "Nikkei 225"
              },
              {
                "s": "INDEX:DAX",
                "d": "DAX Index"
              },
              {
                "s": "OANDA:UK100GBP",
                "d": "FTSE 100"
              }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Commodities",
            "symbols": [
              {
                "s": "CME_MINI:ES1!",
                "d": "E-Mini S&P"
              },
              {
                "s": "CME:E61!",
                "d": "Euro"
              },
              {
                "s": "COMEX:GC1!",
                "d": "Gold"
              },
              {
                "s": "NYMEX:CL1!",
                "d": "Crude Oil"
              },
              {
                "s": "NYMEX:NG1!",
                "d": "Natural Gas"
              },
              {
                "s": "CBOT:ZC1!",
                "d": "Corn"
              }
            ],
            "originalTitle": "Commodities"
          },
          {
            "title": "Bonds",
            "symbols": [
              {
                "s": "CME:GE1!",
                "d": "Eurodollar"
              },
              {
                "s": "CBOT:ZB1!",
                "d": "T-Bond"
              },
              {
                "s": "CBOT:UD1!",
                "d": "Ultra T-Bond"
              },
              {
                "s": "EUREX:GG1!",
                "d": "Euro Bund"
              },
              {
                "s": "EUREX:II1!",
                "d": "Euro BTP"
              },
              {
                "s": "EUREX:HR1!",
                "d": "Euro BOBL"
              }
            ],
            "originalTitle": "Bonds"
          },
          {
            "title": "Forex",
            "symbols": [
              {
                "s": "FX:EURUSD"
              },
              {
                "s": "FX:GBPUSD"
              },
              {
                "s": "FX:USDJPY"
              },
              {
                "s": "FX:USDCHF"
              },
              {
                "s": "FX:AUDUSD"
              },
              {
                "s": "FX:USDCAD"
              }
            ],
            "originalTitle": "Forex"
          }
        ]
      }`
      document.getElementById('market-overview-widget').appendChild(marketOverviewScript)

      let tickerTapeScript = document.createElement('script')
      tickerTapeScript.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js')
      tickerTapeScript.setAttribute('async', '')
      tickerTapeScript.text = `{
        "symbols": [
          {
            "title": "S&P 500",
            "proName": "INDEX:SPX"
          },
          {
            "title": "Shanghai Composite",
            "proName": "INDEX:XLY0"
          },
          {
            "title": "EUR/USD",
            "proName": "FX_IDC:EURUSD"
          },
          {
            "title": "BTC/USD",
            "proName": "BITFINEX:BTCUSD"
          },
          {
            "title": "ETH/USD",
            "proName": "BITFINEX:ETHUSD"
          }
        ],
        "theme": "light",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "in"
      }`
      document.getElementById('ticker-tape-widget').appendChild(tickerTapeScript)

      let marketDataWidget = document.createElement('script')
      marketDataWidget.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js')
      marketDataWidget.setAttribute('async', '')
      marketDataWidget.text = `{
        "locale": "in",
        "symbolsGroups": [
          {
            "symbols": [
              {
                "displayName": "Jpmorgan Chase & Co",
                "name": "NYSE:JPM"
              },
              {
                "displayName": "Wells Fargo Co New",
                "name": "NYSE:WFC"
              },
              {
                "displayName": "Bank Amer Corp",
                "name": "NYSE:BAC"
              },
              {
                "displayName": "Hsbc Hldgs Plc",
                "name": "NYSE:HSBC"
              },
              {
                "displayName": "Citigroup Inc",
                "name": "NYSE:C"
              },
              {
                "displayName": "Mastercard Incorporated",
                "name": "NYSE:MA"
              }
            ],
            "name": "Financial"
          },
          {
            "symbols": [
              {
                "displayName": "Apple",
                "name": "NASDAQ:AAPL"
              },
              {
                "displayName": "Google Inc",
                "name": "NASDAQ:GOOGL"
              },
              {
                "displayName": "Microsoft Corp",
                "name": "NASDAQ:MSFT"
              },
              {
                "displayName": "Facebook Inc",
                "name": "NASDAQ:FB"
              },
              {
                "displayName": "Oracle Corp",
                "name": "NYSE:ORCL"
              },
              {
                "displayName": "Intel Corp",
                "name": "NASDAQ:INTC"
              }
            ],
            "name": "Technology"
          },
          {
            "symbols": [
              {
                "displayName": "Amazon Com Inc",
                "name": "NASDAQ:AMZN"
              },
              {
                "displayName": "Alibaba Group Hldg Ltd",
                "name": "NYSE:BABA"
              },
              {
                "displayName": "At&t Inc",
                "name": "NYSE:T"
              },
              {
                "displayName": "Wal-mart Stores Inc",
                "name": "NYSE:WMT"
              },
              {
                "displayName": "China Mobile Limited",
                "name": "NYSE:CHL"
              },
              {
                "displayName": "Visa Inc",
                "name": "NYSE:V"
              }
            ],
            "name": "Services"
          }
        ],
        "title": "Stocks",
        "width": "100%",
        "height": "230"
      }`
      document.getElementById('stock-market-data-widget').appendChild(marketDataWidget)
    })
  }
}
</script>
