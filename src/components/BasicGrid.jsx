import { Card, CardContent, Button } from '@mui/material';

export default function BasicGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">

      <div>
        <Card className="h-full">
          <CardContent>
            <h2 className="text-xl font-bold">Card 1</h2>
            <p className="text-gray-500">This is some content.</p>
            <Button variant="contained" className="mt-4">Click Me</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardContent>
            <h2 className="text-xl font-bold">Card 2</h2>
            <p className="text-gray-500">More detailed content goes here.</p>
            <Button variant="outlined" className="mt-4">Action</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardContent>
            <h2 className="text-xl font-bold">Card 3</h2>
            <p className="text-gray-500">This is the third card.</p>
            <Button variant="text" className="mt-4">More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
