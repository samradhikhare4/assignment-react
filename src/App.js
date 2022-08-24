import './App.css';
import { useState, useEffect } from "react";
import { CostumerData } from './static-costumer.list';
import Premium from './CustomComponents/premium-sign';
import ShowBid from './CustomComponents/showBidOption';
import PaginationSection from './CustomComponents/Pagination';
import ImageViewer from './CustomComponents/imageviewer';

function App() {
  const pageLimit = 8;
  const [customerBidingList, setCustomerBidingList] = useState([]);
  const [showMinBid, setShowMinBid] = useState(false);
  const [sortingAsc, setSortingByAmount] = useState(null);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    fetch(`https://nex-g.herokuapp.com/`,
      // {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     'Accept': ['application/json', 'application/xml', 'application/svg+xml'],
      //     'Content-Type': 'application/json'
      //   }
      // }
    ).then(resp => resp.json()).then(r => {
      setCustomerBidingList(r.Data)
    }).catch(error => {
      setCustomerBidingList(CostumerData.Data)
    })
  }, [])

  const updateBidOrder = () => {
    setShowMinBid(!showMinBid)
  }

  useEffect(() => {
    updateOrderOfListing()
  }, [sortingAsc])

  const updateSortingOrder = () => {
    if (!sortingAsc) {
      setSortingByAmount('asc');
    } else if (sortingAsc == 'asc') {
      setSortingByAmount('desc');
    } else {
      setSortingByAmount(null);
    }
  }

  const dataFilter = () => {
    return customerBidingList.slice(pageLimit * (activePage - 1), pageLimit + (pageLimit * (activePage - 1)))
  }

  const pageNumberUpdated = (count) => {
    setActivePage(count);
  }

  const updateOrderOfListing = () => {
    let arr = [];
    if (sortingAsc) {
      arr = customerBidingList.map(v => {
        v.MaxBid = Math.max(...v.Customer.bids);
        v.MinBid = Math.min(...v.Customer.bids);
        return v;
      }).sort((a, b) => {
        if (showMinBid) {
          if (sortingAsc == 'asc') {
            return a.MinBid - b.MinBid //ascending for minbid
          } else if (sortingAsc == 'desc') {
            return b.MinBid - a.MinBid  //descending for minbid
          }
          return 0;
        } else {
          if (sortingAsc == 'asc') {
            return a.MaxBid - b.MaxBid
          } else if (sortingAsc == 'desc') {
            return b.MaxBid - a.MaxBid
          }
          return 0;
        }
      })
    } else {
      arr = customerBidingList;
    }

    setCustomerBidingList(arr)

  }


  return (
    <div className="App">
      <header>
        <h3>Customer Biding List</h3>
        <div className='bid-change-button'>
          <button className='bid-type-change-button' onClick={updateBidOrder}>{showMinBid ? 'Show Max. Bid' : 'Show Min. Bid'}</button>
        </div>
      </header>
      <main>
        <div className='table-area'>
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Premium</th>
                <th>Max./Min. Bid <span className="icon-embed icon-embed--vertical" onClick={updateSortingOrder}></span></th>
              </tr>
            </thead>
            <tbody>
              {
                dataFilter().map((v, i) => {
                  return (
                    <tr key={'r' + i} className={i % 2 == 0 ? 'even-row' : 'odd-row'}>
                      <td key={'0' + i}>
                        {v?.Customer?.firstname} {v?.Customer?.lastname}
                        <ImageViewer imagePath={v?.Customer?.avatarUrl} />
                      </td>
                      <td key={'1' + i}>{v?.Customer?.email}</td>
                      <td key={'2' + i}>{v?.Customer?.phone}</td>
                      <td key={'3' + i}>
                        <Premium hasPremium={v?.Customer?.hasPremium} />
                      </td>
                      <td key={'4' + i}>
                        <ShowBid bids={v?.Customer.bids} showMin={showMinBid} />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <div className='pagination-section'>
            {
              customerBidingList?.length &&
              <PaginationSection totalDataLength={CostumerData.Data.length} pageLimit={pageLimit} currentPage={activePage} onPageChange={(pageCount) => pageNumberUpdated(pageCount)} />

            }

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
