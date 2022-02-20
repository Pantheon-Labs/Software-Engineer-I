import React from "react";

export default function About() {
          return (
                    <section id="about">
                              <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
                                        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                                                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                                                            Hi, I'm Tristan.
                                                            <br className="hidden lg:inline-block" />I'm passionate about creating.
                                                  </h1>
                                                  <p className="mb-8 leading-relaxed">
                                                            I’ve always enjoyed jobs that allow me to really show off how creative I can be, whether it be doing a photoshoot for an agency, or coming up with unique marketing strategies for my real estate business. Becoming a developer ties into this perfectly because I get to express my creativity through the code I write, and really demonstrate my creative problem-solving skills. One of the reasons you should hire me is the fact that my brain is currently acting as a sponge towards anything code related. I’m excited to start my career in tech, and to learn new techniques that will help me improve as a developer.
                                                  </p>
                                                  <div className="flex justify-center">
                                                            <a
                                                                      href="#contact"
                                                                      className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                                                                      Work With Me
                                                            </a>
                                                            <a
                                                                      href="#projects"
                                                                      className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                                                                      See My Past Work
                                                            </a>
                                                  </div>
                                        </div>
                                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                                                  <img
                                                            className="object-cover object-center rounded"
                                                            alt="hero"
                                                            src="GV5A1061-Edit.jpg"
                                                  />
                                        </div>
                              </div>
                    </section>
          );
}