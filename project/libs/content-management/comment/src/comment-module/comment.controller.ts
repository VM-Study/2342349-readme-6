import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-helpers';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Post('post/:postId/:userId')
  @ApiOperation({ summary: 'Create a comment' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created', type: CreateCommentDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post for comment not found' })
  public async createComment(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ): Promise<CommentRdo> {
    //todo userId from token
    const createdComment = await this.commentService.createComment(userId, postId, dto);
    return fillDto(CommentRdo, createdComment.toPOJO());
  }

  @Patch(':commentId/:userId')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment updated', type: UpdateCommentDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post for comment not found' })
  public async updateComment(
    @Param('userId') userId: string,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto
  ): Promise<CommentRdo> {
    //todo userId from token
    const createdComment = await this.commentService.updateCommentById(userId, commentId, dto);
    return fillDto(CommentRdo, createdComment.toPOJO());
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comments retrieved successfully', type: [CommentRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post for comment not found' })
  public async getPostComments(
    @Param('postId') postId: string
  ): Promise<CommentRdo> {
    //todo
    return null;
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Get a single comment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment retrieved successfully', type: CommentRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post for comment not found' })
  public async getComment(
    @Param('commentId') commentId: string
  ): Promise<CommentRdo> {
    const foundComment = await this.commentService.findCommentById(commentId);
    return fillDto(CommentRdo, foundComment.toPOJO());
  }

  @Delete(':commentId/:userId')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment deleted', type: CommentRdo })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post for comment not found' })
  public async deleteComment(
    @Param('userId') userId: string,
    @Param('commentId') commentId: string,
  ): Promise<CommentRdo> {
    //todo userId from token
    const createdComment = await this.commentService.deleteCommentById(userId, commentId);
    return fillDto(CommentRdo, createdComment.toPOJO());
  }
}
