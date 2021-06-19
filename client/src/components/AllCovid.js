import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import io from 'socket.io-client';

const AllCovid = (props) => {
  const [ allCovid, setAllCovid ] = useState([]);
  // this will only set the socket 1 time because it is run with a callback function
  const [ socket, setSocket ] = useState( () => io(":8000") );

  useEffect(() => {
    console.log("inside of useEffect for sockets");

    // we listen using the .on() function - this is for BOTH client and server
    socket.on("connect", () => {
      console.log("We are connected with the server on: " + socket.id );
    });

    // listening for when a new covid added!!
    socket.on("covid_added", (data) => {
      console.log(data);
      console.log("Current allCovid state: ");
      console.log(allCovid);

      setAllCovid( (currentAllCovidValue) => {
        console.log("Inside setAllCovid: " + currentAllCovidValue);
        return [ data, ...currentAllCovidValue ];
      });
    });

    socket.on("covid_deleted", (data) => {
      setAllCovid((currentListOfCovid) => {
        let filteredCovid = currentListOfCovid.filter((oneCovid) => {
          // returning true will keep the covid object in the returned array
          // returning false will prevent the covid object from being in the returned array.
          return oneCovid._id !== data;
        })

        return filteredCovid;
      })
    });

    // need to clean up our connection when this component is unloaded
    // return ONLY runs when this component is closed / unloaded
    return () => socket.disconnect();

  }, []);

  useEffect(() => {
    // axios call the route for getAll
    axios.get('http://localhost:8000/api/covid')
      .then((res) => {
        console.log(res.data);  // this is the body that we see in postman's results
        setAllCovid(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])

  const deleteCovid = (covidId) => {
    axios.delete('http://localhost:8000/api/covid/' + covidId)
      .then((res) => {
        console.log(res.data);

        // send the covid ID since we don't need the entire object to remove this
        //    from state on the other clients
        socket.emit("deleted_covid", covidId);

        let filteredCovid = allCovid.filter((oneCovid) => {
          // returning true will keep the covid object in the returned array
          // returning false will prevent the covid object from being in the returned array.
          return oneCovid._id !== covidId;
        })

        setAllCovid(filteredCovid);
      })
      .catch((err) => {
        console.log(err);
        navigate('/covid');
      })
  }

  return (
    <div>
      <h1>Resident Covid-19 Intake</h1>
      <table>
        <thead>
          <th>Resident Name</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {/* map out the covid objects */}
          {
            allCovid.map(( covid, index ) => (
              <tr key={ index }>
                <td>
                  <Link to={"/covid/" + covid._id }>{covid.lastName + ", " + covid.firstName}</Link>
                </td>
                <td>
                  <button className="editBtn" onClick={() => navigate('/covid/' + covid._id + '/edit')}>Edit</button>
                  <button className="deleteBtn" onClick={() => deleteCovid(covid._id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AllCovid;