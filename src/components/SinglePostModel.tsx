import React, { useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../store/post/post.slice";
import { selectPostData } from "../store/post/post.selectors";
import { AppDispatch } from "../store/store";
import { selectUserData } from "../store/user/user.selectors";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const SinglePostModel = ({ open, setOpen, post }: any) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Post</Modal.Header>
      <Modal.Content image>
        <div>
          <section className="flex justify-between mb-3">
            <section className="flex items-center justify-center gap-4">
              <img
                style={{ borderRadius: "100px" }}
                className="w-[50px] "
                // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                src={post?.userId?.profile}
                alt=""
              />
              <h3 className="mt-0">{post?.userId?.username}</h3>
            </section>
            <section>
              <MoreVertIcon />
            </section>
          </section>
          <h5 className="mt-0">{post?.desc}</h5>
          <Image size="medium" src={post?.img} wrapped />
        </div>

        <Modal.Description className="px-10 w-[50%]">
          <Header>Comments</Header>
          <div className="flex flex-col gap-[1rem]">
            <section className="flex gap-[1rem] h-auto items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              />

              <div className="flex flex-col gap-[0.5rem]">
                <h5 className="mb-0">Ilyas Khan</h5>
                <div>
                  <p className=" text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Delectus, eos.
                  </p>
                </div>
              </div>
            </section>
            <section className="flex gap-[1rem] h-auto items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              />

              <div className="flex flex-col gap-[0.5rem]">
                <h5 className="mb-0">Ilyas Khan</h5>
                <div>
                  <p className=" text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Delectus, eos.
                  </p>
                </div>
              </div>
            </section>
            <section className="flex gap-[1rem] h-auto items-center">
              <img
                className="w-[50px] h-[50px] rounded-full"
                src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              />

              <div className="flex flex-col gap-[0.5rem]">
                <h5 className="mb-0">Ilyas Khan</h5>
                <div>
                  <p className=" text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Delectus, eos.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className=" py-[2rem]">
            <textarea
              cols={30}
              className="border w-full focus:outline-none p-2"
              placeholder="Add a comment"
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      {/* <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions> */}
    </Modal>
  );
};

export default SinglePostModel;
