
import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"

interface DepartmentCardProps {
  name: string
  imageUrl: string
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ name, imageUrl }) => {
 
  return (
    <Card className="py-4">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
     
      <h4 className="font-bold text-large">{name}</h4>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
      <Image
        alt="Card background"
        className="object-cover rounded-xl"
        src={imageUrl}
        width={270}
        height={150}
      />
    </CardBody>
  </Card>
  )
}
export default DepartmentCard

