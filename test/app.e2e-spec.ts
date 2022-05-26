import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let host: string;
beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));
await  app.init();
 prisma =  app.get(PrismaService);
await app.listen('4000');
 host = `http://localhost:4000`;
 await prisma.cleanDB();
});

afterAll(async () => {
  app.close();
});
const user:AuthDto = {email:'test@email.net',password:'test',name:'test'};
const bookmark:CreateBookmarkDto = {
  description:'test',
  url:'http://test.com',
  tags:['test'],
  userId:1
} 
describe('auth', () => {
  describe('singup', () => {
    it('should return a token', async () => {
     return pactum.spec().post(host+'/auth/signup').withBody(user).inspect()
    })
  })
  describe('signin', () => {
    it('should return a token', async () => {
      await pactum.spec().post(host+'/auth/signin').withBody(user).stores('token','token');
    
    })
  })
})
 
describe('bookmark', () => {
  describe('create bookmark', () => {

    it('should return a bookmark', async () => {
      return pactum.spec().post(host+'/bookmark').withBody(bookmark).withHeaders({Authorization:'bearer $S{token}'}).inspect()
    });
  }) 
  describe('edit bookmark', () => {})
  describe('delete bookmark', () => {})
  describe('get bookmark', () => {})
})
describe('user', () => {
  describe('get user', () => {})
  describe('edit user', () => {}) 

})


});
