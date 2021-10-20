import requests
import io
import csv
import pandas as pd


sources = [
    {
        'name':'iShares Automation & Robotics UCITS ETF',
        'ticker':'RBOT',
        'url':'https://www.ishares.com/uk/individual/en/products/284219/fund/1535604580409.ajax?fileType=xls&fileName=iShares-Automation--Robotics-UCITS-ETF-USD-Acc_fund&dataType=fund',
        'skiprows': 2
    },
    {
        'name':'iShares Global Clean Energy UCITS ETF',
        'ticker':'INRG',
        'url':'https://www.ishares.com/uk/individual/en/products/251911/ishares-global-clean-energy-ucits-etf/1506575576011.ajax?fileType=csv&fileName=INRG_holdings&dataType=fund',
        'skiprows': 2
    }
]


for source in sources:
    df = pd.read_csv(source['url'], skiprows=source['skiprows'])
    df.to_csv(f'./data/raw/{source["ticker"]}.csv')



# url = "https://www.ishares.com/uk/individual/en/products/284219/fund/1506575576011.ajax?fileType=csv&fileName=RBOT_holdings&dataType=fund"

# df = pd.read_csv(url, skiprows=2)
# df.to_csv('./data/raw/RBOT.csv')
