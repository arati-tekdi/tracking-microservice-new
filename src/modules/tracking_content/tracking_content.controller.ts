import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  SerializeOptions,
  Post,
  Body,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateContentTrackingDto } from './dto/tracking-content-create-dto';
import { SearchContentTrackingDto } from './dto/tracking-content-search-dto';
import { TrackingContentService } from './tracking_content.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('content')
@ApiTags('tracking-content')
export class TrackingContentController {
  constructor(
    private readonly trackingContentService: TrackingContentService,
  ) {}

  //Get Content by Id
  @Get('read/:contentTrackingId')
  @ApiOkResponse({ description: 'Content details fetched successfully' })
  @ApiNotFoundResponse({ description: 'Content Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(CacheInterceptor)
  public async getContentTrackingDetails(
    @Param('contentTrackingId') contentTrackingId: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.trackingContentService.getContentTrackingDetails(
      request,
      contentTrackingId,
      response,
    );
  }

  //Create Content
  @Post('create')
  @ApiCreatedResponse({
    description: 'Content has been created successfully.',
  })
  @ApiBody({ type: CreateContentTrackingDto })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiConflictResponse({ description: 'Duplicate data.' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createContentTracking(
    @Req() request: Request,
    @Body() createContentTrackingDto: CreateContentTrackingDto,
    @Res() response: Response,
  ) {
    return this.trackingContentService.createContentTracking(
      request,
      createContentTrackingDto,
      response,
    );
  }

  // Content
  @Post('search')
  async searchContentTracking(
    @Req() request: Request,
    @Body() searchFilter: any,
    @Res() response: Response,
  ) {
    return this.trackingContentService.searchContentTracking(
      request,
      searchFilter,
      response,
    );
  }

  // Content
  @Post('search/status')
  async searchStatusContentTracking(
    @Req() request: Request,
    @Body() searchFilter: any,
    @Res() response: Response,
  ) {
    return this.trackingContentService.searchStatusContentTracking(
      request,
      searchFilter,
      response,
    );
  }

  //Search Content
  @Post('/list')
  @ApiOkResponse({ description: 'Content data fetch successfully.' })
  @ApiBody({ type: SearchContentTrackingDto })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async searchContentRecords(
    @Req() request: Request,
    @Body() searchContentTrackingDto: SearchContentTrackingDto,
    @Res() response: Response,
  ) {
    return this.trackingContentService.searchContentRecords(
      request,
      searchContentTrackingDto,
      response,
    );
  }

  //Delete Content
  @Delete('delete/:contentTrackingId')
  @ApiOkResponse({ description: 'Content tracking deleted successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiNotFoundResponse({ description: 'Content Not Found.' })
  async deleteContentTracking(
    @Param('contentTrackingId') contentTrackingId: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.trackingContentService.deleteContentTracking(
      request,
      contentTrackingId,
      response,
    );
  }
}
