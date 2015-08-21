#!/usr/bin/env python3

"""
Copyright (c) 2015 Alan Yorinks All rights reserved.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU  General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
"""

import asyncio
import webbrowser
import json

from autobahn.asyncio.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory

from pymata_aio.pymata_core import PymataCore
from redbot_controller import RedBotController


# noinspection PyPep8Naming
class RedBot(WebSocketServerProtocol):
    rb_control = None
    my_core = None

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")
        # send out instance to the redbot controller
        self.rb_control.establish_socket(self)

    def onMessage(self, payload, isBinary):

        cmd_dict = json.loads(payload.decode('utf8'))

        client_cmd = cmd_dict.get("command")
        if client_cmd == "motors":

            # control left motor
            command = cmd_dict.get("left_command")
            if command != 'NoChange':
                if command == 'Brake':
                    command = self.rb_control.BRAKE
                elif command == 'Forward':
                    command = self.rb_control.FORWARD
                elif command == 'Reverse':
                    command = self.rb_control.REVERSE
                else:
                    command = self.rb_control.COAST
                speed = int(cmd_dict.get("left_speed"))
                if speed:
                    speed = (speed * 2) + 40
                yield from self.rb_control.motor_control(self.rb_control.LEFT_MOTOR, command, speed)

            # control right motor
            command = cmd_dict.get("right_command")
            if command != 'NoChange':
                if command == 'Brake':
                    command = self.rb_control.BRAKE
                elif command == 'Forward':
                    command = self.rb_control.FORWARD
                elif command == 'Reverse':
                    command = self.rb_control.REVERSE
                else:
                    command = self.rb_control.COAST
                speed = int(cmd_dict.get("right_speed"))
                if speed:
                    speed = (speed * 2) + 40
                yield from self.rb_control.motor_control(self.rb_control.RIGHT_MOTOR, command, speed)
        elif client_cmd == "ready":
            self.rb_control.client_ready = True

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))
        yield from self.rb_control.motor_control(self.rb_control.LEFT_MOTOR, self.rb_control.COAST, 0)

        yield from self.rb_control.motor_control(self.rb_control.RIGHT_MOTOR, self.rb_control.COAST, 0)
        yield from self.my_core.shutdown()


if __name__ == '__main__':

    factory = WebSocketServerFactory("ws://127.0.0.1:9000", debug=False)
    factory.protocol = RedBot

    loop = asyncio.get_event_loop()
    coro = loop.create_server(factory, '0.0.0.0', 9000)
    server = loop.run_until_complete(coro)

    loop = asyncio.get_event_loop()
    my_core = PymataCore()

    rbc = RedBotController(my_core)

    loop.run_until_complete(rbc.init_red_board())
    factory.protocol.rb_control = rbc
    factory.protocol.my_core = my_core

    new = 2

    url = "http://MrYsLab.github.io/rbDashBoard"

    webbrowser.open(url, new=new)

    try:
        while True:
            loop.run_until_complete(rbc.get_accel_data())
            loop.run_until_complete(asyncio.sleep(.1))
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()
        loop.close()
