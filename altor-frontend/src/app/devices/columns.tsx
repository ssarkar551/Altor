"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

export type Device = {
    device_brand: string,
    model: string,
    processor: string,
    sdk_int: string,
    username: string,
    vehicle_brand: string,
    vehicle_cc: string,
    vehicle_type: string,
    zone: string
}
export const columns: ColumnDef<Device>[] = [
    {
        accessorKey: "username",
        header: "Name"
    },
    {
        accessorKey: "zone",
        header: "Zone"
    },
    {
        accessorKey: "device_brand",
        header: "Device Brand"
    },
    {
        accessorKey: "sdk_int",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                SDK
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "vehicle_brand",
        header: "vehicle Brand"
    },
    {
        accessorKey: "vehicle_cc",
        header: "Vehicle CC"
    },
]