import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const localhost = 'http://localhost:3000';
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
 await prisma.cleanDB();
});

afterAll(async () => {
  app.close();
});
describe('auth', () => {
  describe('singup', () => {
    it('should return a token', async () => {
      const dto:AuthDto = {email:'test@email.net',password:'test',name:'test'};
     return pactum.spec().post(localhost+'/auth/signup').withBody(dto)
    })
  })
  describe('signin', () => {})
})


describe('user', () => {
  describe('get user', () => {})
  describe('edit user', () => {}) 

})
describe('bookmark', () => {
  describe('create bookmark', () => {}) 
  describe('edit bookmark', () => {})
  describe('delete bookmark', () => {})
  describe('get bookmark', () => {})
})

});
