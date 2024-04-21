import { Controller, Delete, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared-helpers';
import { CommentRdo } from '../../../comment/src/comment-module/rdo/comment.rdo';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get(':postId')
  @ApiOperation({ summary: 'Retrieve a Post by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Post retrieved successfully', type: PostRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  public async getPhotoPost(
    @Param('postId') postId: string
  ): Promise<PostRdo> {
    const foundPost = await this.postService.findPostById(postId);
    return fillDto(PostRdo, foundPost.toPOJO());
  }

  @Delete(':postId/:userId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: 'Post deleted', type: CommentRdo })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  public async deletePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ): Promise<PostRdo> {
    //todo userId from token
    const createdComment = await this.postService.deletePostById(userId, postId);
    return fillDto(PostRdo, createdComment.toPOJO());
  }
}