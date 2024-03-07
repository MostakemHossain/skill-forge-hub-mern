const express = require('express')
const cors= require('cors');
const app = express();
require('dotenv').config();
const stripe = require("stripe")(process.env.PAYMENT_SERECT);
const jwt= require('jsonwebtoken');
const port = process.env.PORT || 3000

 
//middleware
app.use(cors());
app.use(express.json());


//verify token

const verifyToken=(req,res,next)=>{
    const authorization= req.headers.authorization;
    if(!authorization){
         return res.status(401).send({
            message:'Invalid Authorization'
         })
    };

    const token= authorization?.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_SERECT,(err,decoded)=>{
        if(err){
            return res.status(403).send({
                message:'Forbidden access'
             })
        }
        res.decoded=decoded;
        next();
    })
}




// mongodb connextion

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0xykbes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a dababase and connection
    const database= client.db("yoga-master");
    const userCollection= database.collection("users");
    const classesCollection= database.collection("classes");
    const cartCollection= database.collection("cart");
    const paymentCollection= database.collection("payments");
    const enrolledCollection= database.collection("enrolled");
    const appliedCollection= database.collection("applied");



    app.post('/api/set-token',async(req,res)=>{
        const user=req.body;
        const token= jwt.sign(user,process.env.ACCESS_SERECT,{
            expiresIn:'24h'
        });
        res.send({token});
    });

    // middleware for admin and instructor
    const verifyAdmin= async(req,res,next)=>{
        const email= req.decoded.email;
        const query= {email:email};

        const user= await userCollection.findOne(query);
        if(user.role==='admin'){
            next();
        }else{
            return res.status(401).send({
                message:'Unauthorized access'
             })
        }
    };

    const verifyInstructor= async(req,res,next)=>{
        const email= req.decoded.email;
        const query= {email:email};

        const user= await userCollection.findOne(query);
        if(user.role==='instructor'){
            next();
        }else{
            return res.status(401).send({
                message:'Unauthorized access'
             })
        }
    }



    // routes for users
    app.post('/new-user',async(req,res)=>{
        const newUser= req.body;
        const result= await userCollection.insertOne(newUser);
        res.send(result);
    });

    app.get('/users', async (req,res)=> {
        const result= await userCollectionfind({}).toArray();
        res.send(result);
    });

    app.get('/users/:id',async(req,res)=>{
        const id= req.params.id;
        const query={_id: new ObjectId(id)};
        const result= await userCollection.findOne(query);
        res.send(result);
    });

    app.get('/user/:email',verifyToken,async(req,res)=>{
        const id= req.params.id;
        const query={email:email};
        const result= await userCollection.findOne(query);
        res.send(result);
    });

    app.delete('/delete-user/:id',verifyToken,verifyAdmin,async(req,res)=>{
        const id= req.params.id;
        const query={_id: new ObjectId(id)};
        const result= await userCollection.deleteOne(query);
        res.send(result);
    });

    app.put('/update-user/:id',verifyToken,verifyAdmin,async(req,res)=>{
        const id= req.params.id;
        const updateUser=req.body;
        const filter={_id: new ObjectId(id)};
        const options={upsert:true}
        const updateDoc={
            $set:{
                name:updateUser.name,
                email:updateUser.email,
                role:updateUser.option,
                address:updateUser.address,
                about:updateUser.about,
                photoUrl:updateUser.photoUrl,
                skills:updateUser.skills ? updateUser.skills : null,

            }
        };
        const result= await userCollection.updateOne(filter,updateDoc,options);
        res.send(result);
    })




    // classes routes here
    app.post('/new-class',verifyToken,verifyInstructor,async (req,res)=>{
        const newClass= req.body;
        const result= await classesCollection.insertOne(newClass);
        res.send(result);
    });

    app.get('/classes',async(req,res)=>{
        const query={status: "Approved",};
        const result= await classesCollection.find(query).toArray();
        res.send(result);
    })

    // get classes by instructor email address
    app.get('/classes/:email',verifyToken,verifyInstructor,async(req,res)=>{
        const email= req.params.email;
        const query={instructorEmail:email};
        const result= await classesCollection.find(query).toArray();
        res.send(result);
    })
    // manage classes
    app.get('/classes-manage',async(req,res)=>{
        
        const result= await classesCollection.find().toArray();
        res.send(result);
    });
    // update class status and reason
    app.patch('/change-status/:id',verifyToken,verifyAdmin,async(req,res)=>{
        const id= req.params.id;
        const status= req.body.status;
        const reason= req.body.reason;
        const filter={_id: new ObjectId(id)};
        const options={upsert:true};
        const updateDoc={
            $set:{
                status:status, 
                reason:reason
            }
        };

        const result= await classesCollection.updateOne(filter,updateDoc,options);
        res.send(result);
    });

    // get approved class
    app.get('/approved-classes', async (req, res) => {
        const query={status: "Approved",};
        const result= await classesCollection.find(query).toArray();
        res.send(result);

    });

    // get single class details
    app.get('/class/:id',async(req,res)=>{
        const id= req.params.id;
        const filter={_id: new ObjectId(id)};

        const result=await  classesCollection.findOne(filter);
        res.send(result);
    });

    // update class details (all data)
    app.put('/update-class/:id',verifyToken,verifyInstructor,async(req,res)=>{
        const id= req.params.id;
        const updateClass= req.body;
        const filter={_id: new ObjectId(id)};
        const options={upsert:true};
        const updateDoc={
            $set:{
                name:updateClass.name,
                description:updateClass.description,
                price:updateClass.price,
                availableSeats:parseInt(updateClass.availableSeats),
                videoLink:updateClass.videoLink,
                status:updateClass.status,
            }
        };

        const result= await classesCollection.updateOne(filter,updateDoc,options);
        res.send(result);

    });





    // !----- Cart Routes ----! 

    app.post('/add-to-cart',verifyToken,async(req,res)=>{
        const newCartItem=req.body;
        const result= await cartCollection.insertOne(newCartItem);
        res.send(result);
    });

    // get cart item by Id
    app.get('/cart-item/:id',verifyToken,async(req,res)=>{
        const id= req.params.id;
        // const email= req.body.email;
        const query={
            courseId:id,
        };
        // const projection={classId:1};
        const result= await cartCollection.findOne(query,{classId:1});
        res.send(result);     
    })
    //  cart info by user email
    app.get('/cart/:email',verifyToken,async(req,res)=>{
        const email= req.params.email;
        const query={email:email};
        const carts= await cartCollection.find(query,{classId:1});
        const classIds= carts.map((cart)=> new ObjectId(cart.courseId));
        const query2={_id:{$in:classIds}};
        const result= await classesCollection.find(query2).toArray();
        res.send(result);

    });

    // delete cart item
    app.delete('/delete-cart-item/:id',verifyToken,async(req,res)=>{
        const id= req.params.id;
        const query={courseId:id};
        const result= await cartCollection.deleteOne(query);
        res.send(result);
    });

    // PAYMENT Routes
    app.post("/create-payment-intent", async (req, res) => {
        const {price}= req.body;
        const amount= parseInt(price)*100;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types:["card"],
          });
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
    });

    // post payment info to db

    app.post('/payment-info',verifyToken,async(req,res)=>{
        const paymentInfo= req.body;
        const courseId= paymentInfo.courseId;
        const userEmail=paymentInfo.userEmail;
        const singleClassId= req.query.courseId;
        let query;
        if(singleClassId){
            query={courseId:singleClassId,userMail:userEmail};
        }else{
            query={courseId:{$in:courseId}};
        };
        const classQuery={_id:{$in:courseId.map(id=> new ObjectId(id))}};
        const classes= await classesCollection.find(classQuery).toArray();
        const newEnrolledData={
            userEmail:userEmail,
            courseId:singleClassId.map(id=> new ObjectId(id)),
            transactionId:paymentInfo.transactionId
        };

        const updateDoc={
            $set:{
                totalErnrolled: classes.reduce((total,current)=> total+current.totalErnrolled,0)+1 || 0,
                availableSeats: classes.reduce((total,current)=> total+current.availableSeats,0)-1 || 0,
            }
        };

        const updatedResult= await classesCollection.updateMany(query,updateDoc,{upsert:true});

        const enrolledResult=await enrolledCollection.insertOne(newEnrolledData);
        const deletedResult= await cartCollection.deleteMany(query);
        const paymentResult= await paymentCollection.insertOne(paymentInfo);
        res.send({
            paymentResult,
            deletedResult,
            enrolledResult,
            updatedResult
        })
    });

    // payment history
    app.get('/payment-history/:email',async (req,res)=>{
        const email= req.query.email;
        const query={userMail:email};
        const result= await paymentCollection.find(query).sort({date:-1}).toArray();
        res.send(result);
    });

    //payment history length
    app.get('/payment-history-length/:email',async (req,res)=>{
        const email= req.query.email;
        const query={userMail:email};
        const total= await paymentCollection.countDocuments(query);
        res.send({
            total:total
        });
    });

    // EnrolledMent Route
    app.get('/popular-classes',async(req,res)=>{
        const result= await classesCollection.find().sort({totalErnrolled:-1}).limit(6).toArray();
        res.send(result);
    });

    app.get('/popular_instructors',async(req,res)=>{
        const pipeline= [
            {
                $group:{
                    _id:"$instructorEmail",
                    totalErnrolled:{$sum:"$totalEnrolled"} 
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"_id",
                    foreignField:"email",
                    as:"instructor"
                }
            },
            {
                $project:{
                    _id:0,
                    instructor:{
                        $arrayElemAt:["$instructor",0]
                    },
                    totalErnrolled:1

                }
            },
            {
                $sort:{
                    totalErnrolled:-1,
                }
            },
            {
                $limit:6
            }
        ];

        const result= await classesCollection.aggregate(pipeline).toArray();
        res.send(result);
    });

    // admin-status

    app.get('/admin-stats',verifyToken,verifyAdmin,async(req,res)=>{
        const approvedClasses= (await classesCollection.find({status:'Approved'}).toArray()).length;
        const pendingClasses= (await classesCollection.find({status:'pending'}).toArray()).length;

        const instructor= (await userCollection.find({role:'instructor'}).toArray()).length;
        const totalClasses= await classesCollection.find().length;
        const totalEnrolled= await enrolledCollection.find().length;

        const result={
            approvedClasses,
            pendingClasses,
            instructor,
            totalClasses,
            totalEnrolled
        };
        res.send(result);
    });

    // get all instructor
    app.get('/instructors',async(req,res)=>{
        const instructor= await userCollection.find({role:'instructor'}).toArray();
          res.send(instructor);
    });

    app.get('/enrolled-classes/:email',verifyToken,async(req,res)=>{
        const email= req.params.email;
        const query={
            userEmail:email
        };
        const pipeline=[
            {
                $match:query
            },
            {
                $lookup:{
                    from:"classes",
                    localField:"courseId",
                    foreignField:"_id",
                    as:"classes",
                }
            },
            {
                $unwind:"$classes"
            },
            {
                $lookup:{
                    from:"users",
                    localField:"classes.instructorEmail",
                    foreignField:"email",
                    as:"instructors",
                }

            },
            {
                $project:{
                    _id:0,
                    instructor:{
                        $arrayElemAt:["$instructor",0]
                    },
                    classes:1

                }
            },

        ]
        const result= await enrolledCollection.aggregate(pipeline).toArray();
        res.send(result);
    });

    // applied for instructor
    app.post('/applied-instructor',async(req,res)=>{
        const data= req.body;
        const result= await appliedCollection.insertOne(data);
        res.send(result);
    });
    
    app.get('/applied-instructors/:email',async(req,res)=>{
        const email= req.params.email;
        const result= await appliedCollection.findOne({email});
        res.send(result);
    });










    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})