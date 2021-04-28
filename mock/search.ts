import { Request, Response } from 'express';

const data = [
  {
    key: '1',
    name: 'Sitecostructor.io',
    description: 'Description',
    promo: 'itPromocodes1',
    isActivated: false,
  },
  {
    key: '2',
    name: 'Appvision.come',
    description: 'Description',
    promo: 'itPromocodes2',
    isActivated: false,
  },
  {
    key: '3',
    name: 'Analytic.com',
    description: 'Description',
    promo: 'itPromocodes3',
    isActivated: false,
  },
  {
    key: '4',
    name: 'Logotype.io',
    description: 'Description',
    promo: 'itPromocodes4',
    isActivated: false,
  },
  {
    key: '5',
    name: 'facebook.io',
    description: 'Description',
    promo: 'itPromocodes5',
    isActivated: false,
  },
  {
    key: '6',
    name: 'google.come',
    description: 'Description',
    promo: 'itPromocodes6',
    isActivated: false,
  },
  {
    key: '7',
    name: 'Amazom.com',
    description: 'Description',
    promo: 'itPromocodes7',
    isActivated: false,
  },
  {
    key: '8',
    name: 'Apple.io',
    description: 'Description',
    promo: 'itPromocodes8',
    isActivated: false,
  },
  {
    key: '9',
    name: 'Adobe.io',
    description: 'Description',
    promo: 'itPromocodes9',
    isActivated: false,
  },
  {
    key: '10',
    name: 'Room.come',
    description: 'Description',
    promo: 'itPromocodes10',
    isActivated: false,
  },
  {
    key: '11',
    name: 'LinkedIn.com',
    description: 'Description',
    promo: 'itPromocodes11',
    isActivated: false,
  },
  {
    key: '12',
    name: 'Yahoo.io',
    description: 'Description',
    promo: 'itPromocodes12',
    isActivated: false,
  },
  {
    key: '13',
    name: 'Alibaba.io',
    description: 'Description',
    promo: 'itPromocodes13',
    isActivated: false,
  },
  {
    key: '14',
    name: 'walmart.come',
    description: 'Description',
    promo: 'itPromocodes14',
    isActivated: false,
  },
  {
    key: '15',
    name: 'State Gris.com',
    description: 'Description',
    promo: 'itPromocodes15',
    isActivated: false,
  },
  {
    key: '16',
    name: 'sinopec.io',
    description: 'Description',
    promo: 'itPromocodes16',
    isActivated: false,
  },
];
export default {
  'GET /api/all': data.filter((_,i)=>{
    return i < 4;
  }),

   'POST /api/search' :  async (req:Request, res: Response) =>{
     const {search} = req.body;
     const result = data.filter((x,i)=>{
      return x.name.toLowerCase().includes(search.toLowerCase())
     })

     res.send({status: 'ok', result})
   },
   'POST /api/activate': async (req:Request, res: Response)=>{
      const {id} = req.body;
      const result = data.find(x=>x.key === id);
      const index = data.findIndex(x=>x.key === id)
      if(result) {
        result.isActivated = true;
        data[index] = result;
        res.send({
          status:'ok',
          body: result
        });
        return;
      }
      res.status(400).send({

      });
   }
   ,
   'POST /api/loadMore': async(req:Request,res:Response) =>{
    const {skip} = req.body;
    const result = data.slice(skip)
     res.send({
      status:'ok',
      body: result
    });
   }

};
