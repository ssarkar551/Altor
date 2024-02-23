"use client";
import { useEffect, useState } from "react";
import { Device, columns } from "./columns";
import { DataTable } from "./data-table";
import { CSVLink } from "react-csv";
import { Button } from "@/components/ui/button";

export default function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState<any>(null);
  useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const res = await fetch(`http://20.121.141.248:5000/assignment/feb/sde_fe`);
            if(!res.ok){
                throw new Error(`Failed to fetch data, status: ${res.status}`);
            }
            const json = await res.json();
            let data = json.data;
            data = data.map((item: { sdk_int: any; })=> {
              if(item.sdk_int){
                item.sdk_int = item.sdk_int.toString();
              }
            })
            setData(json.data)
        } catch(error: any){
            setError(error);
        } finally{
            setIsLoading(false);
        }
    };

    fetchData();
  },[])


  if(isLoading) {
    return <div className="container mx-auto py-10 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
        <div className="flex items-right">
            <Button>
            <CSVLink 
                data={data}
                className="btn btn-primary"
                filename={'dashboard-data.csv'}
                >
                    Download 
            </CSVLink>
            </Button>
        </div>
        <DataTable columns={columns} data={data} />
    </div>
  )

  
}
