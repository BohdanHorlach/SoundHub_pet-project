import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export default function SkeletonCard() {
  return (
    <Card className="animate-pulse bg-gray-200/40 shadow-md mt-6 w-full h-auto">
      <CardHeader floated={false} className="bg-gray-300 h-32"> &nbsp; </CardHeader>
      <CardBody className="w-full">
        <div className="flex items-center justify-start flex-nowrap gap-3 p-0 overflow-x-scroll no-scrollbar">
          <div className="inline-flex whitespace-nowrap rounded-full py-2 px-4 h-10 w-full bg-gray-300"></div>
          <div className="inline-flex whitespace-nowrap rounded-full py-2 px-4 h-10 w-full bg-gray-300"></div>
          <div className="inline-flex whitespace-nowrap rounded-full py-2 px-4 h-10 w-full bg-gray-300"></div>
        </div>
        <div className="flex justify-center p-0 m-0">
          <Typography variant="h5" color="blue-gray" className="mt-5 bg-gray-300 rounded-full w-8/12">
            &nbsp;
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-1 pt-0 w-[100%]">
        <div className="h-12 bg-gray-300 rounded-lg w-[40%]">&nbsp;</div>
        <div className="h-12 bg-gray-300 rounded-lg w-[60%]">&nbsp;</div>
        <div className="h-12 bg-gray-300 rounded-lg w-[40%]">&nbsp;</div>
      </CardFooter>
    </Card>
  );
}
