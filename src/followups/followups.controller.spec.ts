import { Test, TestingModule } from '@nestjs/testing';
import { FollowupsController } from './followups.controller';
import { FollowupsService } from './followups.service';

describe('FollowupsController', () => {
  let controller: FollowupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowupsController],
      providers: [FollowupsService],
    }).compile();

    controller = module.get<FollowupsController>(FollowupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
