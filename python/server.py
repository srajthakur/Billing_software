from http.server import BaseHTTPRequestHandler, HTTPServer
import json

PORT = 8001

class MyRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        # ... Code to handle GET requests ...
        pass

    def do_POST(self):
	
        if self.path == '/api/print_settlement':
            # Handle the POST request and set CORS headers
            print("inPost")
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin','https://srajthakur-ideal-fortnight-r65rp5j6g44cw55w-8001.preview.app.github.dev' )
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            if self.command == 'OPTIONS':
                return

            # Process the received data as needed
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Your logic to process the data and generate a response
            print(data)
            response_data = {'message': 'Received data:', 'data': data}
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'404 - Not Found')

    def do_OPTIONS(self):
        # Handle OPTIONS request and set CORS headers
        print("inoption")
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'https://srajthakur-ideal-fortnight-r65rp5j6g44cw55w-8001.preview.app.github.dev')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == "__main__":
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, MyRequestHandler)
    print(f"Serving at port {PORT}")
    httpd.serve_forever()

